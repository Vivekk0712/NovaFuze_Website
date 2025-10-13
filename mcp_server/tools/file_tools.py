import os
import uuid
import hashlib
from typing import List, Dict, Optional, Any
from datetime import datetime
import PyPDF2
import io
import json

# Simple embedding using TF-IDF-like approach
EMBEDDING_DIM = 1536  # Match database schema expectation

def generate_embedding(text: str) -> List[float]:
    """Generate simple embedding for given text using hash-based approach"""
    try:
        # Simple hash-based embedding for now
        # In production, you'd use a proper embedding model
        import hashlib
        
        # Generate exactly 1536 dimensions
        embeddings = []
        
        # Use the text to generate consistent hash-based embeddings
        base_text = text if text else "empty"
        
        # Generate 1536 values by using different hash inputs
        for i in range(1536):
            # Create different hash inputs for each dimension
            hash_input = f"{base_text}_{i}_{len(base_text)}".encode()
            
            # Use different hash algorithms based on position
            if i % 4 == 0:
                hash_obj = hashlib.md5(hash_input)
            elif i % 4 == 1:
                hash_obj = hashlib.sha1(hash_input)
            elif i % 4 == 2:
                hash_obj = hashlib.sha256(hash_input)
            else:
                hash_obj = hashlib.blake2b(hash_input, digest_size=8)
            
            # Get hash bytes and convert to float
            hash_bytes = hash_obj.digest()
            # Use the first byte of the hash for this dimension
            byte_value = hash_bytes[i % len(hash_bytes)]
            embeddings.append(float(byte_value) / 255.0)
        
        # Ensure we have exactly 1536 dimensions
        assert len(embeddings) == 1536, f"Expected 1536 dimensions, got {len(embeddings)}"
        return embeddings
        
    except Exception as e:
        print(f"Error generating embedding: {e}")
        return [0.0] * 1536

def extract_text_from_pdf(file_content: bytes) -> Dict[str, Any]:
    """Extract text content from PDF file"""
    try:
        pdf_file = io.BytesIO(file_content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        
        extracted_data = {
            'total_pages': len(pdf_reader.pages),
            'chunks': [],
            'full_text': ''
        }
        
        full_text = ""
        chunk_size = 1000  # characters per chunk
        chunk_overlap = 200  # overlap between chunks
        
        for page_num, page in enumerate(pdf_reader.pages):
            try:
                page_text = page.extract_text()
                full_text += f"\n--- Page {page_num + 1} ---\n{page_text}"
                
                # Split page text into chunks
                if len(page_text) > chunk_size:
                    start = 0
                    chunk_index = 0
                    while start < len(page_text):
                        end = start + chunk_size
                        chunk_text = page_text[start:end]
                        
                        # Try to break at word boundary
                        if end < len(page_text):
                            last_space = chunk_text.rfind(' ')
                            if last_space > chunk_size * 0.7:  # Don't break too early
                                end = start + last_space
                                chunk_text = page_text[start:end]
                        
                        extracted_data['chunks'].append({
                            'chunk_index': chunk_index,
                            'content': chunk_text.strip(),
                            'page_number': page_num + 1
                        })
                        
                        start = end - chunk_overlap
                        chunk_index += 1
                else:
                    # Page fits in one chunk
                    extracted_data['chunks'].append({
                        'chunk_index': 0,
                        'content': page_text.strip(),
                        'page_number': page_num + 1
                    })
                    
            except Exception as e:
                print(f"Error extracting text from page {page_num + 1}: {e}")
                continue
        
        extracted_data['full_text'] = full_text.strip()
        return extracted_data
        
    except Exception as e:
        raise Exception(f"Failed to extract text from PDF: {str(e)}")

def upload_file_to_storage(file_content: bytes, filename: str, user_id: str) -> str:
    """Upload file to Supabase Storage"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            raise Exception("Supabase client not initialized")
        
        # Create unique filename
        file_extension = os.path.splitext(filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        storage_path = f"uploads/{user_id}/{unique_filename}"
        
        # Upload to Supabase Storage
        response = supabase.storage.from_("files").upload(
            path=storage_path,
            file=file_content,
            file_options={"content-type": "application/pdf"}
        )
        
        # Check if upload was successful (Response object)
        if hasattr(response, 'status_code') and response.status_code != 200:
            raise Exception(f"Storage upload failed with status {response.status_code}")
        
        return storage_path
        
    except Exception as e:
        raise Exception(f"Failed to upload file to storage: {str(e)}")

def create_file_record(user_id: str, filename: str, file_size: int, file_path: str) -> Dict[str, Any]:
    """Create file record in database"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            raise Exception("Supabase client not initialized")
        
        file_data = {
            'user_id': user_id,
            'filename': os.path.basename(file_path),
            'original_filename': filename,
            'file_type': 'pdf',
            'file_size': file_size,
            'file_path': file_path,
            'content_type': 'application/pdf',
            'upload_status': 'uploaded'
        }
        
        response = supabase.table('files').insert(file_data).execute()
        if response.data:
            return response.data[0]
        else:
            raise Exception("Failed to create file record")
            
    except Exception as e:
        raise Exception(f"Failed to create file record: {str(e)}")

def process_file_chunks(file_id: str, chunks: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Process and store file chunks with embeddings"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            raise Exception("Supabase client not initialized")
        
        chunk_records = []
        
        for chunk in chunks:
            # Create chunk record
            chunk_data = {
                'file_id': file_id,
                'chunk_index': chunk['chunk_index'],
                'content': chunk['content'],
                'page_number': chunk['page_number']
            }
            
            chunk_response = supabase.table('file_chunks').insert(chunk_data).execute()
            if not chunk_response.data:
                continue
                
            chunk_record = chunk_response.data[0]
            chunk_records.append(chunk_record)
            
            # Generate and store embedding
            embedding = generate_embedding(chunk['content'])
            embedding_data = {
                'file_chunk_id': chunk_record['id'],
                'vector': embedding,
                'content_type': 'file_chunk'
            }
            
            supabase.table('embeddings').insert(embedding_data).execute()
        
        return chunk_records
        
    except Exception as e:
        raise Exception(f"Failed to process file chunks: {str(e)}")

def upload_pdf_file(user_id: str, filename: str, file_content: bytes) -> Dict[str, Any]:
    """Complete PDF upload process"""
    try:
        from supabase_client import supabase, get_or_create_user
        
        if supabase is None:
            raise Exception("Supabase client not initialized")
        
        # Get or create user and get their UUID
        user_record = get_or_create_user(user_id)
        user_uuid = user_record['id']
        
        # Extract text from PDF
        extracted_data = extract_text_from_pdf(file_content)
        
        # Upload file to storage
        file_path = upload_file_to_storage(file_content, filename, user_uuid)
        
        # Create file record using user UUID
        file_record = create_file_record(user_uuid, filename, len(file_content), file_path)
        
        # Update status to processing
        supabase.table('files').update({
            'upload_status': 'processing'
        }).eq('id', file_record['id']).execute()
        
        try:
            # Process chunks and generate embeddings
            chunk_records = process_file_chunks(file_record['id'], extracted_data['chunks'])
            
            # Update status to processed
            supabase.table('files').update({
                'upload_status': 'processed',
                'updated_at': datetime.now().isoformat()
            }).eq('id', file_record['id']).execute()
            
            return {
                'success': True,
                'file_id': file_record['id'],
                'filename': filename,
                'total_pages': extracted_data['total_pages'],
                'chunks_created': len(chunk_records),
                'file_path': file_path
            }
            
        except Exception as processing_error:
            # Update status to failed
            supabase.table('files').update({
                'upload_status': 'failed',
                'processing_error': str(processing_error),
                'updated_at': datetime.now().isoformat()
            }).eq('id', file_record['id']).execute()
            
            raise processing_error
            
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def get_user_files(user_id: str, limit: int = 50) -> List[Dict[str, Any]]:
    """Get files uploaded by a user"""
    try:
        from supabase_client import supabase, get_or_create_user
        
        if supabase is None:
            print("Supabase client not initialized")
            return []
        
        # Get or create user and get their UUID
        user_record = get_or_create_user(user_id)
        user_uuid = user_record['id']
        
        response = supabase.table('files').select('*').eq('user_id', user_uuid).order('created_at', desc=True).limit(limit).execute()
        return response.data if response.data else []
    except Exception as e:
        print(f"Error fetching user files: {e}")
        return []

def get_file_by_id(file_id: str) -> Optional[Dict[str, Any]]:
    """Get file by ID"""
    try:
        from supabase_client import supabase
        
        if supabase is None:
            print("Supabase client not initialized")
            return None
        
        response = supabase.table('files').select('*').eq('id', file_id).execute()
        return response.data[0] if response.data else None
    except Exception as e:
        print(f"Error fetching file: {e}")
        return None

def search_similar_chunks(query: str, user_id: str, limit: int = 5) -> List[Dict[str, Any]]:
    """Search for similar file chunks using text similarity"""
    try:
        from supabase_client import supabase, get_or_create_user
        
        if supabase is None:
            print("Supabase client not initialized")
            return []
        
        # Get or create user and get their UUID
        user_record = get_or_create_user(user_id)
        user_uuid = user_record['id']
        
        # Get user's files
        user_files = get_user_files(user_id)
        if not user_files:
            return []
        
        file_ids = [f['id'] for f in user_files]
        
        # Use simple text search
        response = supabase.table('file_chunks').select(
            'id, content, page_number, file_id, files!inner(filename, original_filename)'
        ).in_('file_id', file_ids).execute()
        
        if not response.data:
            return []
        
        # Simple similarity scoring based on text overlap
        chunks_with_scores = []
        query_lower = query.lower()
        
        for chunk in response.data:
            content_lower = chunk['content'].lower()
            # Simple scoring based on word overlap
            query_words = set(query_lower.split())
            content_words = set(content_lower.split())
            overlap = len(query_words.intersection(content_words))
            score = overlap / len(query_words) if query_words else 0
            
            if score > 0:
                chunks_with_scores.append({
                    **chunk,
                    'similarity_score': score
                })
        
        # Sort by similarity score and return top results
        chunks_with_scores.sort(key=lambda x: x['similarity_score'], reverse=True)
        return chunks_with_scores[:limit]
        
    except Exception as e:
        print(f"Error searching similar chunks: {e}")
        return []

def delete_file(file_id: str, user_id: str) -> bool:
    """Delete file and all related data"""
    try:
        from supabase_client import supabase, get_or_create_user
        
        if supabase is None:
            print("Supabase client not initialized")
            return False
        
        # Get or create user and get their UUID
        user_record = get_or_create_user(user_id)
        user_uuid = user_record['id']
        
        # Get file record
        file_record = get_file_by_id(file_id)
        if not file_record or file_record['user_id'] != user_uuid:
            return False
        
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
