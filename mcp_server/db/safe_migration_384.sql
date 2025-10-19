-- ============================================================================
-- SAFE MIGRATION: Clear old embeddings and update to 384 dimensions
-- ============================================================================
-- This script safely migrates from 1536-dim to 384-dim embeddings
-- Run this in Supabase SQL Editor
-- ============================================================================

-- Step 1: Backup count (for verification)
DO $$
DECLARE
    embedding_count INTEGER;
    chunk_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO embedding_count FROM embeddings;
    SELECT COUNT(*) INTO chunk_count FROM file_chunks;
    
    RAISE NOTICE '📊 Current state:';
    RAISE NOTICE '   - Embeddings: %', embedding_count;
    RAISE NOTICE '   - File chunks: %', chunk_count;
    RAISE NOTICE '   These embeddings will be regenerated with semantic embeddings';
END $$;

-- Step 2: Delete all existing embeddings (they'll be regenerated)
-- This is safe because file_chunks are preserved
DELETE FROM embeddings;

-- Verify deletion
DO $$
DECLARE
    remaining INTEGER;
BEGIN
    SELECT COUNT(*) INTO remaining FROM embeddings;
    RAISE NOTICE '✅ Embeddings cleared. Remaining: %', remaining;
END $$;

-- Step 3: Now safely update the vector dimension
ALTER TABLE embeddings ALTER COLUMN vector TYPE vector(384);

-- Step 4: Update the match_file_chunks function to use 384 dimensions
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

-- Step 5: Add keyword search function for hybrid search
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

-- Step 6: Create full-text search index for better keyword search performance
CREATE INDEX IF NOT EXISTS idx_file_chunks_content_fts 
ON file_chunks USING gin(to_tsvector('english', content));

-- Step 7: Add comments for documentation
COMMENT ON FUNCTION public.match_file_chunks(vector(384), int, uuid) IS 
'Semantic vector similarity search using 384-dimensional embeddings from Sentence Transformers';

COMMENT ON FUNCTION public.keyword_search_chunks(text, uuid, int) IS 
'Full-text keyword search for hybrid search implementation';

-- Step 8: Verify the migration
DO $$
DECLARE
    chunk_count INTEGER;
    embedding_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO chunk_count FROM file_chunks;
    SELECT COUNT(*) INTO embedding_count FROM embeddings;
    
    RAISE NOTICE '';
    RAISE NOTICE '============================================================';
    RAISE NOTICE 'MIGRATION COMPLETE ✅';
    RAISE NOTICE '============================================================';
    RAISE NOTICE 'File chunks preserved: %', chunk_count;
    RAISE NOTICE 'Embeddings to regenerate: %', chunk_count;
    RAISE NOTICE 'Current embeddings: % (should be 0)', embedding_count;
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Install: pip install sentence-transformers';
    RAISE NOTICE '2. Run: python migrate_embeddings.py';
    RAISE NOTICE '3. Test improved search accuracy';
    RAISE NOTICE '============================================================';
END $$;

-- ============================================================================
-- MIGRATION SCRIPT COMPLETE
-- ============================================================================
-- Your file chunks are safe and preserved
-- Old embeddings have been cleared
-- Schema is now ready for 384-dimensional semantic embeddings
-- Run migrate_embeddings.py to regenerate all embeddings
-- ============================================================================
