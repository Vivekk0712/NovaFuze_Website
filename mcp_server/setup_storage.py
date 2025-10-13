import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client

def init_supabase():
    """Initialize Supabase client from environment variables"""
    load_dotenv()
    
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    
    if not supabase_url or not supabase_key:
        print("Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set in .env")
        sys.exit(1)
    
    try:
        supabase: Client = create_client(supabase_url, supabase_key)
        return supabase
    except Exception as e:
        print(f"Error initializing Supabase client: {e}")
        sys.exit(1)

def create_storage_bucket(supabase: Client, bucket_name: str = 'files'):
    """
    Create a storage bucket in Supabase
    
    Args:
        supabase (Client): Initialized Supabase client
        bucket_name (str, optional): Name of the bucket to create. Defaults to 'files'.
    """
    try:
        # Check if bucket already exists
        existing_buckets = supabase.storage.list_buckets()
        
        for bucket in existing_buckets:
            if bucket['name'] == bucket_name:
                print(f"Bucket '{bucket_name}' already exists.")
                return
        
        # Allowed MIME types for various document types
        allowed_mime_types = [
            # PDF
            'application/pdf',
            
            # Text files
            'text/plain',
            
            # Microsoft Office/OpenOffice
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',  # .docx
            'application/msword',  # .doc
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',  # .xlsx
            'application/vnd.ms-excel',  # .xls
            
            # Web/Markup files
            'text/html',
            'application/json',
            'text/csv',
            'application/xml',
            'text/xml'
        ]
        
        # Create bucket
        response = supabase.storage.create_bucket(
            bucket_name, 
            public=False,  # Private by default
            file_size_limit=50 * 1024 * 1024,  # 50MB limit
            allowed_mime_types=allowed_mime_types
        )
        
        print(f"Successfully created bucket: {bucket_name}")
        print("Supported file types:")
        for mime_type in allowed_mime_types:
            print(f"- {mime_type}")
        
    except Exception as e:
        print(f"Error creating bucket '{bucket_name}': {e}")
        sys.exit(1)

def main():
    """Main function to set up Supabase storage"""
    print("🚀 Supabase Storage Setup")
    
    # Initialize Supabase client
    supabase = init_supabase()
    
    # Create files bucket
    create_storage_bucket(supabase, 'files')
    
    # Optional: Create additional buckets if needed
    # Uncomment and modify as required
    # create_storage_bucket(supabase, 'images')
    # create_storage_bucket(supabase, 'documents')

if __name__ == '__main__':
    main()
