import os
import google.generativeai as genai

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel('gemini-2.5-pro')

def generate_from_prompt(prompt: str, context: list[dict], user_name: str = None, file_context: list[dict] = None):
    """
    Generates a response from the Gemini model with optional file context.
    """
    # System prompt to define AI behavior
    system_prompt = """You are a helpful AI assistant. Be polite, professional, and helpful. 
    Do not roleplay as characters or pretend to be someone else. 
    Provide clear, accurate, and useful responses to user questions and requests.
    Keep your responses conversational but professional.
    
    If the user references documents or files, use the provided file context to give accurate, 
    specific answers based on the document content. Always cite which document or page the 
    information comes from when referencing file content."""
    
    # Build user context
    user_context = ""
    if user_name:
        user_context = f"The user's name is {user_name}. "
    
    # Build context string from chat history
    context_str = ""
    if context:
        # Use all messages for context (remove the 5 message limit)
        for message in context:
            role = "Assistant" if message['role'] == 'assistant' else "User"
            context_str += f"{role}: {message['content']}\n"
    
    # Build file context string
    file_context_str = ""
    if file_context:
        file_context_str = "\n\nRelevant document content:\n"
        for chunk in file_context:
            filename = chunk.get('files', {}).get('original_filename', 'Unknown document')
            page = chunk.get('page_number', 'Unknown page')
            content = chunk.get('content', '')
            similarity_score = chunk.get('similarity_score', 0)
            
            file_context_str += f"--- From {filename}, Page {page} (Relevance: {similarity_score:.2f}) ---\n"
            file_context_str += f"{content}\n\n"
    
    # Combine all context with proper system prompt
    if context_str and file_context_str:
        full_prompt = f"{system_prompt}\n\n{user_context}Previous conversation:\n{context_str}{file_context_str}Current message: {prompt}"
    elif context_str:
        full_prompt = f"{system_prompt}\n\n{user_context}Previous conversation:\n{context_str}\nCurrent message: {prompt}"
    elif file_context_str:
        full_prompt = f"{system_prompt}\n\n{user_context}{file_context_str}Current message: {prompt}"
    else:
        full_prompt = f"{system_prompt}\n\n{user_context}Current message: {prompt}"

    # Use simple generate_content instead of chat
    response = model.generate_content(full_prompt)
    return response.text
