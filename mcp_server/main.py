import os
import sys
import logging
from fastapi import FastAPI, HTTPException, UploadFile, File, Depends, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from pydantic_settings import BaseSettings

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from tools import user_tools, chat_tools, file_tools, admin_tools
from ai_client import generate_from_prompt
from supabase_client import init_supabase

class Settings(BaseSettings):
    GEMINI_API_KEY: str
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str
    JWT_SECRET_KEY: str = "your-secret-key-change-in-production"

    class Config:
        env_file = ".env"

settings = Settings()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Security scheme
security = HTTPBearer()

@app.on_event("startup")
async def startup_event():
    init_supabase(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)

class ChatRequest(BaseModel):
    user_id: str
    message: str
    metadata: dict | None = None
    user_name: str | None = None
    user_email: str | None = None

class AdminLoginRequest(BaseModel):
    email: str
    password: str

class AdminCreateRequest(BaseModel):
    email: str
    password: str
    name: str

# Dependency to verify admin token
async def verify_admin_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    admin = admin_tools.verify_admin_token(token)
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid or expired admin token")
    return admin

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/mcp/query")
async def mcp_query(request: ChatRequest):
    user_id = request.user_id
    user_message = request.message
    user_name = request.user_name
    user_email = request.user_email
    logger.info(f"Received chat request from user {user_id} (name: {user_name}, email: {user_email})")

    try:
        # 1. Get or create user profile with name/email
        logger.info("Getting/creating user profile...")
        logger.info(f"Calling get_user_profile with: firebase_uid={user_id}, email={user_email}, name={user_name}")
        user = user_tools.get_user_profile(user_id, user_email, user_name)
        logger.info(f"User profile result: {user}")

        # 2. Get chat history
        logger.info("Getting chat history...")
        chat_history = chat_tools.get_chat_history(user_id)
        logger.info(f"Chat history: {chat_history}")
        print(f"DEBUG: MCP server returning chat history: {chat_history}")

        # 3. Search for relevant file content
        logger.info("Searching for relevant file content...")
        file_context = file_tools.search_similar_chunks(user_message, user_id, limit=3)
        logger.info(f"Found {len(file_context)} relevant file chunks")

        # 4. Generate response with user context and file context
        logger.info("Generating AI response...")
        assistant_response = generate_from_prompt(user_message, chat_history, user_name, file_context)
        logger.info(f"Assistant response generated successfully")

        # 5. Store messages
        logger.info("Storing user message...")
        chat_tools.store_message(user_id, "user", user_message)
        logger.info("Storing assistant message...")
        chat_tools.store_message(user_id, "assistant", assistant_response)
        logger.info("Messages stored successfully")

        # 6. Return response
        return {"reply": assistant_response}
    except Exception as e:
        logger.error(f"Error processing chat request for user {user_id}: {str(e)}")
        logger.error(f"Error type: {type(e).__name__}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/mcp/history")
async def mcp_history(user_id: str):
    logger.info(f"Fetching chat history for user {user_id}")
    try:
        chat_history = chat_tools.get_chat_history(user_id)
        return chat_history
    except Exception as e:
        logger.error(f"Error fetching chat history for user {user_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.delete("/mcp/clear-chat")
async def mcp_clear_chat(user_id: str):
    logger.info(f"Clearing chat history for user {user_id}")
    try:
        result = chat_tools.clear_chat_history(user_id)
        logger.info(f"Successfully cleared chat history for user {user_id}")
        return {"message": "Chat history cleared successfully", "result": result}
    except Exception as e:
        logger.error(f"Error clearing chat history for user {user_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# File Upload Endpoints
@app.post("/mcp/upload-pdf")
async def upload_pdf(user_id: str, file: UploadFile = File(...)):
    logger.info(f"Uploading PDF file for user {user_id}")
    
    # Validate file type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    # Check file size (max 10MB)
    file_content = await file.read()
    if len(file_content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size too large. Maximum 10MB allowed")
    
    try:
        result = file_tools.upload_pdf_file(user_id, file.filename, file_content)
        if result['success']:
            logger.info(f"Successfully uploaded PDF for user {user_id}")
            return result
        else:
            raise HTTPException(status_code=500, detail=result['error'])
    except Exception as e:
        logger.error(f"Error uploading PDF for user {user_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/mcp/files")
async def get_user_files(user_id: str):
    logger.info(f"Fetching files for user {user_id}")
    try:
        files = file_tools.get_user_files(user_id)
        return {"files": files}
    except Exception as e:
        logger.error(f"Error fetching files for user {user_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.delete("/mcp/files/{file_id}")
async def delete_file(user_id: str, file_id: str):
    logger.info(f"Deleting file {file_id} for user {user_id}")
    try:
        success = file_tools.delete_file(file_id, user_id)
        if success:
            return {"message": "File deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="File not found or access denied")
    except Exception as e:
        logger.error(f"Error deleting file {file_id} for user {user_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/mcp/search-files")
async def search_files(user_id: str, query: str):
    logger.info(f"Searching files for user {user_id} with query: {query}")
    try:
        similar_chunks = file_tools.search_similar_chunks(query, user_id)
        return {"chunks": similar_chunks}
    except Exception as e:
        logger.error(f"Error searching files for user {user_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin Endpoints
@app.post("/admin/login")
async def admin_login(request: AdminLoginRequest):
    logger.info(f"Admin login attempt for {request.email}")
    try:
        result = admin_tools.authenticate_admin(request.email, request.password)
        if result['success']:
            logger.info(f"Admin login successful for {request.email}")
            return result
        else:
            raise HTTPException(status_code=401, detail=result['error'])
    except Exception as e:
        logger.error(f"Error in admin login: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/admin/create")
async def create_admin(request: AdminCreateRequest):
    logger.info(f"Creating admin user: {request.email}")
    try:
        result = admin_tools.create_admin_user(request.email, request.password, request.name)
        if result['success']:
            logger.info(f"Admin user created successfully: {request.email}")
            return result
        else:
            raise HTTPException(status_code=400, detail=result['error'])
    except Exception as e:
        logger.error(f"Error creating admin user: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/admin/files")
async def get_all_files(limit: int = 100, offset: int = 0, admin: dict = Depends(verify_admin_token)):
    logger.info(f"Admin {admin['email']} fetching all files")
    try:
        result = admin_tools.get_all_files(limit, offset)
        if result['success']:
            return result
        else:
            raise HTTPException(status_code=500, detail=result['error'])
    except Exception as e:
        logger.error(f"Error fetching files for admin: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/admin/files/{file_id}")
async def get_file_details(file_id: str, admin: dict = Depends(verify_admin_token)):
    logger.info(f"Admin {admin['email']} fetching file details: {file_id}")
    try:
        result = admin_tools.get_file_details(file_id)
        if result['success']:
            return result
        else:
            raise HTTPException(status_code=404, detail=result['error'])
    except Exception as e:
        logger.error(f"Error fetching file details for admin: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.delete("/admin/files/{file_id}")
async def delete_file_admin(file_id: str, admin: dict = Depends(verify_admin_token)):
    logger.info(f"Admin {admin['email']} deleting file: {file_id}")
    try:
        success = admin_tools.delete_file_admin(file_id)
        if success:
            return {"message": "File deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        logger.error(f"Error deleting file for admin: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/admin/stats")
async def get_system_stats(admin: dict = Depends(verify_admin_token)):
    logger.info(f"Admin {admin['email']} fetching system stats")
    try:
        result = admin_tools.get_system_stats()
        if result['success']:
            return result
        else:
            raise HTTPException(status_code=500, detail=result['error'])
    except Exception as e:
        logger.error(f"Error fetching system stats for admin: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
