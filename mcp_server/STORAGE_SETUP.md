# Supabase Storage Bucket Setup

## Prerequisites

1. Supabase Project
2. Python 3.8+
3. Supabase Python Library
4. `python-dotenv`

## Setup Steps

### 1. Install Dependencies
```bash
cd mcp_server
pip install -r requirements.txt
```

### 2. Configure Environment Variables
Create a `.env` file in the `mcp_server` directory with:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Run Storage Setup Script
```bash
python setup_storage.py
```

## What This Script Does

- Initializes Supabase client
- Creates a 'files' bucket
- Sets bucket properties:
  - Private access
  - 50MB file size limit
  - PDF-only uploads

## Troubleshooting

- Ensure Supabase URL and Service Role Key are correct
- Check network connectivity
- Verify Python dependencies are installed

## Customization

Modify `setup_storage.py` to:
- Add more buckets
- Change file size limits
- Adjust allowed MIME types
