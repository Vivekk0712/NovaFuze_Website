-- users
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  firebase_uid text unique not null,
  email text,
  name text,
  is_admin boolean default false,
  created_at timestamptz default now()
);

-- admin_users (separate table for Supabase admin authentication)
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text,
  is_active boolean default true,
  created_at timestamptz default now(),
  last_login timestamptz
);

-- files table for uploaded documents
create table if not exists files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  filename text not null,
  original_filename text not null,
  file_type text not null,
  file_size bigint not null,
  file_path text not null, -- path in Supabase Storage
  content_type text not null,
  upload_status text default 'uploaded', -- 'uploaded', 'processing', 'processed', 'failed'
  processing_error text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- file_chunks for storing extracted text content
create table if not exists file_chunks (
  id uuid primary key default gen_random_uuid(),
  file_id uuid references files(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  page_number integer,
  created_at timestamptz default now()
);

-- messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  role text not null, -- 'user' | 'assistant' | 'system'
  content text not null,
  metadata jsonb default '{}'::jsonb,
  file_context_ids uuid[] default '{}', -- array of file_chunks IDs used for context
  created_at timestamptz default now()
);

-- embeddings table for vector search
create table if not exists embeddings (
  id uuid primary key default gen_random_uuid(),
  file_chunk_id uuid references file_chunks(id) on delete cascade,
  message_id uuid references messages(id) on delete cascade,
  vector double precision[], -- 1536 dimensions for OpenAI embeddings
  content_type text not null, -- 'file_chunk' or 'message'
  created_at timestamptz default now()
);

-- file_permissions for admin file access control
create table if not exists file_permissions (
  id uuid primary key default gen_random_uuid(),
  file_id uuid references files(id) on delete cascade,
  admin_user_id uuid references admin_users(id) on delete cascade,
  permission_type text not null, -- 'read', 'write', 'delete'
  granted_at timestamptz default now(),
  granted_by uuid references admin_users(id)
);

-- Enable pgvector extension for vector operations (if not already enabled)
create extension if not exists vector;

-- Update embeddings table to use proper vector type
alter table embeddings alter column vector type vector(1536);

-- Create indexes for better performance
create index if not exists idx_files_user_id on files(user_id);
create index if not exists idx_files_upload_status on files(upload_status);
create index if not exists idx_file_chunks_file_id on file_chunks(file_id);
create index if not exists idx_embeddings_file_chunk_id on embeddings(file_chunk_id);
create index if not exists idx_embeddings_message_id on embeddings(message_id);
create index if not exists idx_embeddings_content_type on embeddings(content_type);

-- Create updated_at trigger for files table
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_files_updated_at
  before update on files
  for each row
  execute function update_updated_at_column();

-- Match file chunks by vector similarity for a given user
create or replace function public.match_file_chunks(
  query_embedding vector(1536),
  match_count int,
  user_uuid uuid
)
returns table (
  id uuid,
  content text,
  page_number int,
  file_id uuid,
  similarity float
)
language sql
stable
as $$
  select fc.id,
         fc.content,
         fc.page_number,
         fc.file_id,
         1 - (e.vector <=> query_embedding) as similarity
  from public.embeddings e
  join public.file_chunks fc on fc.id = e.file_chunk_id
  join public.files f on f.id = fc.file_id
  where e.content_type = 'file_chunk'
    and f.user_id = user_uuid
  order by e.vector <=> query_embedding
  limit match_count;
$$;

-- Ensure function is available via PostgREST
comment on function public.match_file_chunks(vector(1536), int, uuid) is 'RPC for vector similarity over file_chunks for a specific user';
