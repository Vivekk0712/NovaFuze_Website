-- ============================================================================
-- SCHEMA UPDATE: Migrate from 1536-dim to 384-dim embeddings
-- ============================================================================
-- This script updates the database schema to support semantic embeddings
-- Run this BEFORE running the migrate_embeddings.py script
-- ============================================================================

-- Step 1: Update embeddings table vector dimension
-- Note: This will temporarily break existing embeddings, but they'll be regenerated
ALTER TABLE embeddings ALTER COLUMN vector TYPE vector(384);

-- Step 2: Update the match_file_chunks function to use 384 dimensions
CREATE OR REPLACE FUNCTION public.match_file_chunks(
  query_embedding vector(384),  -- Changed from 1536 to 384
  match_count int,
  user_uuid uuid
)
RETURNS TABLE (
  id uuid,
  content text,
  page_number int,
  file_id uuid,
  similarity float
)
LANGUAGE sql
STABLE
AS $$
  SELECT fc.id,
         fc.content,
         fc.page_number,
         fc.file_id,
         1 - (e.vector <=> query_embedding) as similarity
  FROM public.embeddings e
  JOIN public.file_chunks fc ON fc.id = e.file_chunk_id
  JOIN public.files f ON f.id = fc.file_id
  WHERE e.content_type = 'file_chunk'
    AND f.user_id = user_uuid
  ORDER BY e.vector <=> query_embedding
  LIMIT match_count;
$$;

-- Step 3: Add keyword search function for hybrid search
CREATE OR REPLACE FUNCTION public.keyword_search_chunks(
  search_query text,
  user_uuid uuid,
  match_count int
)
RETURNS TABLE (
  id uuid,
  content text,
  page_number int,
  file_id uuid,
  rank float
)
LANGUAGE sql
STABLE
AS $$
  SELECT fc.id,
         fc.content,
         fc.page_number,
         fc.file_id,
         ts_rank(to_tsvector('english', fc.content), 
                 plainto_tsquery('english', search_query)) as rank
  FROM public.file_chunks fc
  JOIN public.files f ON f.id = fc.file_id
  WHERE f.user_id = user_uuid
    AND to_tsvector('english', fc.content) @@ plainto_tsquery('english', search_query)
  ORDER BY rank DESC
  LIMIT match_count;
$$;

-- Step 4: Create full-text search index for better keyword search performance
CREATE INDEX IF NOT EXISTS idx_file_chunks_content_fts 
ON file_chunks USING gin(to_tsvector('english', content));

-- Step 5: Add comments for documentation
COMMENT ON FUNCTION public.match_file_chunks(vector(384), int, uuid) IS 
'Semantic vector similarity search using 384-dimensional embeddings from Sentence Transformers';

COMMENT ON FUNCTION public.keyword_search_chunks(text, uuid, int) IS 
'Full-text keyword search for hybrid search implementation';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- Next steps:
-- 1. Install sentence-transformers: pip install sentence-transformers
-- 2. Run migration script: python migrate_embeddings.py
-- 3. Test the improved search accuracy
-- ============================================================================
