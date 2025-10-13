import os
import sys
from dotenv import load_dotenv
import supabase
import uvicorn
import fastapi
import google.generativeai

def check_environment():
    print("🔍 Environment Diagnostic Tool 🔍")
    
    # Load environment variables
    load_dotenv()
    
    # Check critical environment variables
    critical_vars = [
        'SUPABASE_URL', 
        'SUPABASE_SERVICE_ROLE_KEY', 
        'GEMINI_API_KEY', 
        'JWT_SECRET_KEY'
    ]
    
    print("\n📋 Environment Variable Check:")
    for var in critical_vars:
        value = os.getenv(var)
        status = "✅ Present" if value else "❌ Missing"
        print(f"{var}: {status}")
    
    # Check library versions
    print("\n📦 Library Versions:")
    libraries = [
        ('supabase', supabase.__version__),
        ('uvicorn', uvicorn.__version__),
        ('fastapi', fastapi.__version__),
        ('google-generativeai', google.generativeai.__version__)
    ]
    
    for lib, version in libraries:
        print(f"{lib}: {version}")
    
    # Supabase client test
    try:
        from supabase_client import init_supabase
        print("\n🔐 Supabase Client Test:")
        result = init_supabase()
        print("✅ Supabase Client Initialization Successful")
    except Exception as e:
        print(f"❌ Supabase Client Initialization Failed: {e}")

if __name__ == '__main__':
    check_environment()
