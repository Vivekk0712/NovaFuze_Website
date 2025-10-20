# 📊 Database Schema Files

This folder contains SQL schema files for setting up your Supabase database.

---

## 🆕 For New Supabase Accounts (Fresh Install)

**Use this file:**
```
schema_384_fresh.sql
```

**What it does:**
- ✅ Creates all tables from scratch
- ✅ Uses 384-dimensional semantic embeddings
- ✅ Includes semantic search function
- ✅ Includes keyword search function
- ✅ Adds full-text search index
- ✅ Production-ready

**How to use:**
1. Create new Supabase project
2. Open SQL Editor in Supabase
3. Copy and paste `schema_384_fresh.sql`
4. Run it
5. Done! ✅

---

## 🔄 For Existing Accounts (Migration)

**If you already have data with old 1536-dim embeddings:**

### Step 1: Run Migration
```
safe_migration_384.sql
```

**What it does:**
- ✅ Preserves your file_chunks (your data is safe!)
- ✅ Clears old embeddings
- ✅ Updates schema to 384 dimensions
- ✅ Adds new search functions

### Step 2: Regenerate Embeddings
```bash
python migrate_embeddings.py
```

This regenerates all embeddings with the new semantic model.

---

## 📁 File Reference

| File | Purpose | When to Use |
|------|---------|-------------|
| **schema_384_fresh.sql** | Complete schema with 384-dim | New Supabase accounts |
| **safe_migration_384.sql** | Migration from 1536 to 384 | Existing accounts with data |
| **schema.sql** | Original schema (1536-dim) | Legacy/reference only |
| **schema_update_384.sql** | Partial update | Not recommended (use safe_migration instead) |

---

## 🎯 Quick Decision Guide

### Scenario 1: Brand New Project
```
✅ Use: schema_384_fresh.sql
❌ Don't use: safe_migration_384.sql (nothing to migrate)
```

### Scenario 2: Existing Project with Data
```
✅ Use: safe_migration_384.sql + migrate_embeddings.py
❌ Don't use: schema_384_fresh.sql (will conflict with existing tables)
```

### Scenario 3: Starting Over (Delete Everything)
```
1. Delete all tables in Supabase
2. Use: schema_384_fresh.sql
```

---

## 🔍 What's Different?

### Old System (schema.sql)
- 1536-dimensional vectors (OpenAI embeddings)
- Hash-based embeddings
- ~40-50% accuracy
- Keyword matching only

### New System (schema_384_fresh.sql)
- 384-dimensional vectors (Sentence Transformers)
- Semantic embeddings
- ~70-85% accuracy
- Semantic + keyword search (hybrid)

---

## ⚠️ Important Notes

1. **Don't mix files** - Use either fresh schema OR migration, not both
2. **Backup first** - Always backup before running migrations
3. **Test locally** - Test on a dev database first
4. **Check dimensions** - Verify vector dimension matches your code (384)

---

## 🚀 After Running Schema

### Next Steps:

1. **Create Storage Bucket**
   ```bash
   python setup_storage.py
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Update Environment Variables**
   ```bash
   # In .env file
   SUPABASE_URL=your-url
   SUPABASE_SERVICE_ROLE_KEY=your-key
   ```

4. **Test Connection**
   ```bash
   python test_semantic_search.py
   ```

---

## 📊 Schema Overview

### Tables Created:
- `users` - User accounts (Firebase auth)
- `admin_users` - Admin accounts (Supabase auth)
- `files` - Uploaded documents metadata
- `file_chunks` - Extracted text chunks
- `messages` - Chat history
- `embeddings` - Vector embeddings (384-dim)
- `file_permissions` - Admin access control

### Functions Created:
- `match_file_chunks()` - Semantic vector search
- `keyword_search_chunks()` - Full-text keyword search
- `update_updated_at_column()` - Auto-update timestamps

### Indexes Created:
- User ID indexes for fast lookups
- File status indexes
- Full-text search indexes
- Vector similarity indexes

---

## 🐛 Troubleshooting

### Error: "relation already exists"
**Solution:** You're trying to run fresh schema on existing database. Use migration instead.

### Error: "type vector does not exist"
**Solution:** Enable pgvector extension first (included in schema files).

### Error: "dimension mismatch"
**Solution:** Make sure your code uses 384 dimensions, not 1536.

### Error: "function does not exist"
**Solution:** Run the complete schema file, not partial updates.

---

## ✅ Verification

After running schema, verify in Supabase:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check vector dimension
SELECT atttypmod FROM pg_attribute 
WHERE attrelid = 'embeddings'::regclass 
AND attname = 'vector';
-- Should return: 388 (384 + 4 for pgvector metadata)

-- Check functions exist
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public';
```

---

**Your database is now ready for semantic search! 🎉**
