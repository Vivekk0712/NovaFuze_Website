import bcrypt
from jose import jwt
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
import os

# JWT settings
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_admin_user(email: str, password: str, name: str) -> Dict[str, Any]:
    """Create a new admin user"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            return {
                'success': False,
                'error': 'Supabase client not initialized'
            }
        
        # Check if admin already exists
        existing = supabase.table('admin_users').select('*').eq('email', email).execute()
        if existing.data:
            return {
                'success': False,
                'error': 'Admin user already exists with this email'
            }
        
        # Hash password
        password_hash = hash_password(password)
        
        # Create admin user
        admin_data = {
            'email': email,
            'password_hash': password_hash,
            'name': name,
            'is_active': True
        }
        
        response = supabase.table('admin_users').insert(admin_data).execute()
        if response.data:
            return {
                'success': True,
                'admin_id': response.data[0]['id'],
                'email': email,
                'name': name
            }
        else:
            return {
                'success': False,
                'error': 'Failed to create admin user'
            }
            
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def authenticate_admin(email: str, password: str) -> Dict[str, Any]:
    """Authenticate admin user"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            return {
                'success': False,
                'error': 'Supabase client not initialized'
            }
        
        # Get admin user
        response = supabase.table('admin_users').select('*').eq('email', email).eq('is_active', True).execute()
        
        if not response.data:
            return {
                'success': False,
                'error': 'Invalid credentials'
            }
        
        admin = response.data[0]
        
        # Verify password
        if not verify_password(password, admin['password_hash']):
            return {
                'success': False,
                'error': 'Invalid credentials'
            }
        
        # Update last login
        supabase.table('admin_users').update({
            'last_login': datetime.now().isoformat()
        }).eq('id', admin['id']).execute()
        
        # Generate JWT token
        token_data = {
            'admin_id': admin['id'],
            'email': admin['email'],
            'exp': datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
        }
        
        token = jwt.encode(token_data, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
        
        return {
            'success': True,
            'token': token,
            'admin': {
                'id': admin['id'],
                'email': admin['email'],
                'name': admin['name']
            }
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def verify_admin_token(token: str) -> Optional[Dict[str, Any]]:
    """Verify admin JWT token"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            return None
        
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        admin_id = payload.get('admin_id')
        
        if not admin_id:
            return None
        
        # Get admin user from database
        response = supabase.table('admin_users').select('*').eq('id', admin_id).eq('is_active', True).execute()
        
        if response.data:
            return response.data[0]
        else:
            return None
            
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
    except Exception as e:
        print(f"Error verifying admin token: {e}")
        return None

def get_all_files(limit: int = 100, offset: int = 0) -> Dict[str, Any]:
    """Get all files for admin dashboard"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            return {
                'success': False,
                'error': 'Supabase client not initialized'
            }
        
        response = supabase.table('files').select(
            'id, filename, original_filename, file_size, upload_status, created_at, updated_at, users!inner(name, email)'
        ).order('created_at', desc=True).range(offset, offset + limit - 1).execute()
        
        return {
            'success': True,
            'files': response.data if response.data else [],
            'total': len(response.data) if response.data else 0
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def get_file_details(file_id: str) -> Dict[str, Any]:
    """Get detailed file information including chunks"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            return {
                'success': False,
                'error': 'Supabase client not initialized'
            }
        
        # Get file info
        file_response = supabase.table('files').select(
            '*, users!inner(name, email)'
        ).eq('id', file_id).execute()
        
        if not file_response.data:
            return {
                'success': False,
                'error': 'File not found'
            }
        
        file_info = file_response.data[0]
        
        # Get file chunks
        chunks_response = supabase.table('file_chunks').select('*').eq('file_id', file_id).order('chunk_index').execute()
        
        return {
            'success': True,
            'file': file_info,
            'chunks': chunks_response.data if chunks_response.data else []
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def update_file_status(file_id: str, status: str, error_message: str = None) -> bool:
    """Update file processing status"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            return False
        
        update_data = {
            'upload_status': status,
            'updated_at': datetime.now().isoformat()
        }
        
        if error_message:
            update_data['processing_error'] = error_message
        
        supabase.table('files').update(update_data).eq('id', file_id).execute()
        return True
        
    except Exception as e:
        print(f"Error updating file status: {e}")
        return False

def delete_file_admin(file_id: str) -> bool:
    """Delete file (admin function)"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            return False
        
        # Get file record
        file_response = supabase.table('files').select('*').eq('id', file_id).execute()
        if not file_response.data:
            return False
        
        file_record = file_response.data[0]
        
        # Delete from storage
        try:
            supabase.storage.from_("files").remove([file_record['file_path']])
        except Exception as e:
            print(f"Warning: Could not delete file from storage: {e}")
        
        # Delete file record (cascade will handle chunks and embeddings)
        supabase.table('files').delete().eq('id', file_id).execute()
        
        return True
        
    except Exception as e:
        print(f"Error deleting file: {e}")
        return False

def get_system_stats() -> Dict[str, Any]:
    """Get system statistics for admin dashboard"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            return {
                'success': False,
                'error': 'Supabase client not initialized'
            }
        
        # Get user count
        users_response = supabase.table('users').select('id', count='exact').execute()
        user_count = users_response.count if hasattr(users_response, 'count') else 0
        
        # Get file count
        files_response = supabase.table('files').select('id', count='exact').execute()
        file_count = files_response.count if hasattr(files_response, 'count') else 0
        
        # Get processed files count
        processed_response = supabase.table('files').select('id', count='exact').eq('upload_status', 'processed').execute()
        processed_count = processed_response.count if hasattr(processed_response, 'count') else 0
        
        # Get message count
        messages_response = supabase.table('messages').select('id', count='exact').execute()
        message_count = messages_response.count if hasattr(messages_response, 'count') else 0
        
        return {
            'success': True,
            'stats': {
                'total_users': user_count,
                'total_files': file_count,
                'processed_files': processed_count,
                'total_messages': message_count
            }
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }
