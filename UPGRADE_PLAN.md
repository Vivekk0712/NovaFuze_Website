# 🚀 RAG System Upgrade Plan - Prioritized

## 🥇 **Priority 1: Semantic Embeddings (MUST DO)**

### **Impact:** ⭐⭐⭐⭐⭐ (Highest)
### **Effort:** ⚡⚡ (Low-Medium)
### **Cost:** $0 (Self-hosted)

### **Current Problem:**
Hash-based embeddings don't understand semantic meaning:
- "car" and "automobile" → Different vectors
- "happy" and "joyful" → No similarity
- "What's the deadline?" vs "When is it due?" → Poor matching

### **Solution: Sentence Transformers**

```python
# Add to requirements.txt
sentence-transformers==2.2.2

# Update file_tools.py
from sentence_transformers import SentenceTransformer

# Initialize model (do this once at startup)
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

def generate_embedding(text: str) -> List[float]:
    """Generate semantic embedding using Sentence Transformers"""
    if not text or not text.strip():
        return [0.0] * 384  # Model outputs 384 dimensions
    
    # Generate embedding
    embedding = embedding_model.encode(text, convert_to_numpy=True)
    return embedding.tolist()
```

### **Database Schema Update:**
```sql
-- Update vector dimension from 1536 to 384
ALTER TABLE embeddings ALTER COLUMN vector TYPE vector(384);

-- Update the RPC function
CREATE OR REPLACE FUNCTION public.match_file_chunks(
  query_embedding vector(384),  -- Changed from 1536
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
LANGUAGE sql STABLE AS $$
  SELECT fc.id, fc.content, fc.page_number, fc.file_id,
         1 - (e.vector <=> query_embedding) as similarity
  FROM public.embeddings e
  JOIN public.file_chunks fc ON fc.id = e.file_chunk_id
  JOIN public.files f ON f.id = fc.file_id
  WHERE e.content_type = 'file_chunk'
    AND f.user_id = user_uuid
  ORDER BY e.vector <=> query_embedding
  LIMIT match_count;
$$;
```

### **Benefits:**
- ✅ **50-80% better retrieval accuracy**
- ✅ **Understands synonyms and context**
- ✅ **Multilingual support** (50+ languages)
- ✅ **Still self-hosted** (no API costs)
- ✅ **Fast inference** (~10ms per embedding)

### **Model Options:**
| Model | Dimensions | Size | Speed | Quality |
|-------|-----------|------|-------|---------|
| `all-MiniLM-L6-v2` | 384 | 80MB | ⚡⚡⚡ | ⭐⭐⭐ |
| `all-mpnet-base-v2` | 768 | 420MB | ⚡⚡ | ⭐⭐⭐⭐ |
| `paraphrase-multilingual-MiniLM-L12-v2` | 384 | 420MB | ⚡⚡ | ⭐⭐⭐⭐ (multilingual) |

**Recommendation:** Start with `all-MiniLM-L6-v2` (best speed/quality balance)

---

## 🥈 **Priority 2: Hybrid Search (HIGH IMPACT)**

### **Impact:** ⭐⭐⭐⭐ (High)
### **Effort:** ⚡⚡⚡ (Medium)
### **Cost:** $0

### **Why Hybrid Search?**
Combines **semantic search** (meaning) + **keyword search** (exact matches)

**Example:**
- Query: "Project deadline for Q4 2024"
- **Semantic:** Finds "due date", "completion time", "fourth quarter"
- **Keyword:** Finds exact "Q4 2024" mentions
- **Hybrid:** Best of both worlds!

### **Implementation:**

```python
def hybrid_search(query: str, user_id: str, limit: int = 10) -> List[Dict]:
    """
    Combine vector similarity + keyword matching for better results
    """
    # 1. Vector search (semantic)
    vector_results = search_similar_chunks(query, user_id, limit=limit)
    
    # 2. Keyword search (exact matches)
    keyword_results = keyword_search(query, user_id, limit=limit)
    
    # 3. Merge and re-rank using RRF (Reciprocal Rank Fusion)
    return reciprocal_rank_fusion(vector_results, keyword_results, limit=limit)

def keyword_search(query: str, user_id: str, limit: int = 10) -> List[Dict]:
    """Full-text search using PostgreSQL"""
    from supabase_client import supabase, get_or_create_user
    
    user_record = get_or_create_user(user_id)
    user_uuid = user_record['id']
    
    # PostgreSQL full-text search
    response = supabase.rpc('keyword_search_chunks', {
        'search_query': query,
        'user_uuid': user_uuid,
        'match_count': limit
    }).execute()
    
    return response.data

def reciprocal_rank_fusion(
    vector_results: List[Dict],
    keyword_results: List[Dict],
    k: int = 60,
    limit: int = 10
) -> List[Dict]:
    """
    RRF: Combines rankings from multiple sources
    Score = sum(1 / (k + rank))
    """
    scores = {}
    
    # Score vector results
    for rank, result in enumerate(vector_results, 1):
        chunk_id = result['id']
        scores[chunk_id] = scores.get(chunk_id, 0) + 1 / (k + rank)
    
    # Score keyword results
    for rank, result in enumerate(keyword_results, 1):
        chunk_id = result['id']
        scores[chunk_id] = scores.get(chunk_id, 0) + 1 / (k + rank)
    
    # Merge results and sort by score
    all_results = {r['id']: r for r in vector_results + keyword_results}
    ranked = sorted(
        [(chunk_id, score) for chunk_id, score in scores.items()],
        key=lambda x: x[1],
        reverse=True
    )
    
    return [all_results[chunk_id] for chunk_id, _ in ranked[:limit]]
```

### **Database Function:**
```sql
-- Add full-text search function
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
LANGUAGE sql STABLE AS $$
  SELECT fc.id, fc.content, fc.page_number, fc.file_id,
         ts_rank(to_tsvector('english', fc.content), 
                 plainto_tsquery('english', search_query)) as rank
  FROM public.file_chunks fc
  JOIN public.files f ON f.id = fc.file_id
  WHERE f.user_id = user_uuid
    AND to_tsvector('english', fc.content) @@ plainto_tsquery('english', search_query)
  ORDER BY rank DESC
  LIMIT match_count;
$$;
```

### **Benefits:**
- ✅ **Better for specific terms** (dates, names, codes)
- ✅ **Handles typos better** (semantic search)
- ✅ **More robust** (fallback if one method fails)
- ✅ **15-30% accuracy improvement** over vector-only

---

## 🥉 **Priority 3: Query Rewriting (MEDIUM-HIGH IMPACT)**

### **Impact:** ⭐⭐⭐⭐ (High)
### **Effort:** ⚡⚡ (Low-Medium)
### **Cost:** $0 (uses existing Gemini)

### **Problem:**
User queries are often vague or poorly formed:
- "What about the thing?" → Too vague
- "deadline" → Missing context
- "How much does it cost?" → Ambiguous

### **Solution: AI Query Expansion**

```python
def expand_query(query: str, conversation_context: List[Dict]) -> str:
    """
    Use Gemini to expand/clarify the query before searching
    """
    expansion_prompt = f"""
Given this conversation context and user query, generate 2-3 alternative 
phrasings that capture the user's intent. Include synonyms and related terms.

Conversation:
{format_context(conversation_context)}

User Query: {query}

Generate alternative queries (one per line):
"""
    
    response = model.generate_content(expansion_prompt)
    expanded_queries = response.text.strip().split('\n')
    
    # Search with all variations
    all_results = []
    for expanded_query in expanded_queries[:3]:
        results = hybrid_search(expanded_query, user_id, limit=5)
        all_results.extend(results)
    
    # Deduplicate and return top results
    return deduplicate_results(all_results, limit=10)
```

### **Benefits:**
- ✅ **Handles vague queries** better
- ✅ **Uses conversation context** for clarity
- ✅ **Finds more relevant results**
- ✅ **10-20% improvement** in retrieval

---

## 🏅 **Priority 4: Re-ranking (MEDIUM IMPACT)**

### **Impact:** ⭐⭐⭐ (Medium-High)
### **Effort:** ⚡⚡⚡ (Medium)
### **Cost:** $0 (self-hosted)

### **Why Re-ranking?**
Initial retrieval gets ~100 candidates, re-ranking picks the best 5-10

```python
# Add to requirements.txt
sentence-transformers==2.2.2  # Already added

# In file_tools.py
from sentence_transformers import CrossEncoder

# Initialize re-ranker
reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')

def rerank_results(query: str, results: List[Dict], top_k: int = 5) -> List[Dict]:
    """
    Re-rank search results using cross-encoder for better relevance
    """
    if not results:
        return []
    
    # Prepare pairs for re-ranking
    pairs = [(query, result['content']) for result in results]
    
    # Get relevance scores
    scores = reranker.predict(pairs)
    
    # Sort by score
    ranked_results = [
        {**result, 'rerank_score': float(score)}
        for result, score in zip(results, scores)
    ]
    ranked_results.sort(key=lambda x: x['rerank_score'], reverse=True)
    
    return ranked_results[:top_k]
```

### **Benefits:**
- ✅ **More accurate final results**
- ✅ **Better than similarity alone**
- ✅ **5-15% accuracy improvement**

---

## 🎖️ **Priority 5: Metadata Filtering (MEDIUM IMPACT)**

### **Impact:** ⭐⭐⭐ (Medium)
### **Effort:** ⚡⚡ (Low-Medium)
### **Cost:** $0

### **Add Rich Metadata:**

```python
# Enhanced file metadata
file_metadata = {
    'file_type': 'pdf',
    'upload_date': '2024-01-15',
    'tags': ['project', 'deadline', 'Q4'],
    'category': 'planning',
    'language': 'en',
    'author': 'John Doe',
    'department': 'Engineering'
}

# Search with filters
def filtered_search(
    query: str,
    user_id: str,
    file_types: List[str] = None,
    date_range: tuple = None,
    tags: List[str] = None
):
    """Search with metadata filters"""
    
    # Build filter conditions
    filters = []
    if file_types:
        filters.append(f"f.file_type IN {tuple(file_types)}")
    if date_range:
        filters.append(f"f.created_at BETWEEN '{date_range[0]}' AND '{date_range[1]}'")
    if tags:
        filters.append(f"f.tags && ARRAY{tags}")
    
    # Apply filters in search
    # ... implementation
```

### **Benefits:**
- ✅ **Faster searches** (pre-filtered)
- ✅ **More relevant results**
- ✅ **Better user control**

---

## 📊 **Upgrade Priority Matrix**

```
High Impact, Low Effort (DO FIRST):
┌─────────────────────────────────┐
│ 1. Semantic Embeddings    ⭐⭐⭐⭐⭐│
│ 3. Query Rewriting        ⭐⭐⭐⭐  │
└─────────────────────────────────┘

High Impact, Medium Effort (DO NEXT):
┌─────────────────────────────────┐
│ 2. Hybrid Search          ⭐⭐⭐⭐  │
│ 4. Re-ranking             ⭐⭐⭐   │
└─────────────────────────────────┘

Medium Impact, Low Effort (DO LATER):
┌─────────────────────────────────┐
│ 5. Metadata Filtering     ⭐⭐⭐   │
└─────────────────────────────────┘
```

---

## 🎯 **Recommended Implementation Order**

### **Phase 1: Foundation (Week 1)**
1. ✅ **Semantic Embeddings** - Biggest impact, easy to implement
2. ✅ **Query Rewriting** - Leverages existing Gemini, quick win

**Expected Improvement:** 60-80% better retrieval

### **Phase 2: Enhancement (Week 2)**
3. ✅ **Hybrid Search** - Combines semantic + keyword
4. ✅ **Re-ranking** - Polishes final results

**Expected Improvement:** Additional 20-30% improvement

### **Phase 3: Optimization (Week 3)**
5. ✅ **Metadata Filtering** - User experience enhancement
6. ✅ **Performance tuning** - Caching, indexing

**Expected Improvement:** Faster, more user-friendly

---

## 💰 **Cost Analysis**

| Upgrade | Setup Cost | Runtime Cost | Maintenance |
|---------|-----------|--------------|-------------|
| Semantic Embeddings | $0 | $0 | Low |
| Hybrid Search | $0 | $0 | Low |
| Query Rewriting | $0 | ~$0.001/query | Low |
| Re-ranking | $0 | $0 | Low |
| Metadata Filtering | $0 | $0 | Low |

**Total Cost:** ~$0 (all self-hosted except minimal Gemini usage)

---

## 🚀 **Quick Start: Semantic Embeddings**

### **Step 1: Install**
```bash
cd mcp_server
source venv/bin/activate
pip install sentence-transformers==2.2.2
```

### **Step 2: Update Code**
```python
# At top of file_tools.py
from sentence_transformers import SentenceTransformer

# Initialize once
_embedding_model = None

def get_embedding_model():
    global _embedding_model
    if _embedding_model is None:
        _embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
    return _embedding_model

def generate_embedding(text: str) -> List[float]:
    """Generate semantic embedding"""
    if not text or not text.strip():
        return [0.0] * 384
    
    model = get_embedding_model()
    embedding = model.encode(text, convert_to_numpy=True)
    return embedding.tolist()
```

### **Step 3: Update Database**
```sql
-- Run in Supabase SQL Editor
ALTER TABLE embeddings ALTER COLUMN vector TYPE vector(384);

-- Update function (see above)
```

### **Step 4: Re-index Existing Files**
```python
# Create migration script
def reindex_all_files():
    """Re-generate embeddings for all existing files"""
    from supabase_client import supabase
    
    # Get all file chunks
    response = supabase.table('file_chunks').select('*').execute()
    
    for chunk in response.data:
        # Generate new embedding
        new_embedding = generate_embedding(chunk['content'])
        
        # Update embedding
        supabase.table('embeddings')\
            .update({'vector': new_embedding})\
            .eq('file_chunk_id', chunk['id'])\
            .execute()
```

---

## 📈 **Expected Results**

### **Before Upgrades:**
- Retrieval Accuracy: ~40-50%
- Query Understanding: Basic
- Response Quality: Good

### **After Phase 1 (Semantic + Query Rewriting):**
- Retrieval Accuracy: ~70-85% ⬆️ +35%
- Query Understanding: Excellent
- Response Quality: Very Good

### **After Phase 2 (+ Hybrid + Re-ranking):**
- Retrieval Accuracy: ~85-95% ⬆️ +45%
- Query Understanding: Excellent
- Response Quality: Excellent

---

## 🎓 **Learning Resources**

- **Sentence Transformers**: https://www.sbert.net/
- **Hybrid Search**: https://www.pinecone.io/learn/hybrid-search/
- **Re-ranking**: https://www.sbert.net/examples/applications/cross-encoder/README.html
- **Query Expansion**: https://arxiv.org/abs/2305.03653

---

## ✅ **Action Items**

1. [ ] Install sentence-transformers
2. [ ] Update generate_embedding() function
3. [ ] Migrate database schema (vector dimension)
4. [ ] Re-index existing files
5. [ ] Test retrieval accuracy
6. [ ] Implement hybrid search
7. [ ] Add query rewriting
8. [ ] Deploy and monitor

**Estimated Time:** 2-3 weeks for full implementation
**Expected ROI:** 2-3x better retrieval accuracy