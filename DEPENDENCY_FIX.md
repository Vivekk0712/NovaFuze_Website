# 🔧 Fix: "cannot import name 'cached_download'" Error

## ❌ **Error Explanation:**
You have incompatible versions of `sentence-transformers` and `huggingface-hub`. The newer `huggingface-hub` removed the `cached_download` function that older `sentence-transformers` versions use.

## ✅ **Quick Fix (2 minutes)**

### **Option 1: Use Fix Script (Easiest)**

```bash
cd mcp_server
fix_dependencies.bat
```

This will automatically:
1. Uninstall incompatible packages
2. Install compatible versions
3. Test the installation

---

### **Option 2: Manual Fix**

```bash
cd mcp_server

# Step 1: Uninstall incompatible packages
pip uninstall -y sentence-transformers huggingface-hub transformers

# Step 2: Install compatible versions
pip install sentence-transformers==2.2.2
pip install transformers==4.30.2
pip install huggingface-hub==0.16.4

# Step 3: Test
python -c "from sentence_transformers import SentenceTransformer; print('✅ Success!')"
```

---

### **Option 3: Install from requirements.txt**

```bash
cd mcp_server
pip install -r requirements.txt --force-reinstall
```

---

## 🧪 **Verify Installation**

```bash
# Test import
python -c "from sentence_transformers import SentenceTransformer; print('✅ Working!')"

# Test embedding generation
python embeddings.py
```

**Expected output:**
```
✅ Semantic embeddings enabled (Sentence Transformers)
Loading embedding model: all-MiniLM-L6-v2
Embedding model loaded successfully
```

---

## 🚀 **After Fix, Run Migration**

```bash
python migrate_embeddings.py
```

---

## 📦 **Compatible Versions**

| Package | Version | Why |
|---------|---------|-----|
| sentence-transformers | 2.2.2 | Stable, well-tested |
| transformers | 4.30.2 | Compatible with sentence-transformers 2.2.2 |
| huggingface-hub | 0.16.4 | Has `cached_download` function |
| torch | 2.0.1 | (Optional) For better performance |

---

## ⚠️ **Common Issues**

### **Issue: "No module named 'torch'"**

**Solution:**
```bash
# PyTorch is optional but recommended
pip install torch==2.0.1
```

### **Issue: Still getting import errors**

**Solution:**
```bash
# Clean install
pip uninstall -y sentence-transformers huggingface-hub transformers torch
pip cache purge
pip install sentence-transformers==2.2.2
```

### **Issue: "Permission denied"**

**Solution:**
```bash
# Run as administrator or use --user flag
pip install --user sentence-transformers==2.2.2
```

---

## 🎯 **Quick Test Commands**

```bash
# Test 1: Import check
python -c "from sentence_transformers import SentenceTransformer"

# Test 2: Model loading
python -c "from sentence_transformers import SentenceTransformer; m = SentenceTransformer('all-MiniLM-L6-v2'); print('✅ Model loaded')"

# Test 3: Embedding generation
python -c "from sentence_transformers import SentenceTransformer; m = SentenceTransformer('all-MiniLM-L6-v2'); e = m.encode('test'); print(f'✅ Embedding: {len(e)} dimensions')"

# Test 4: Full test
python embeddings.py
```

---

## 📋 **Complete Fix Checklist**

- [ ] Uninstall old packages
- [ ] Install compatible versions
- [ ] Test import
- [ ] Test model loading
- [ ] Run embeddings.py test
- [ ] Run migrate_embeddings.py
- [ ] Verify migration success

---

## 🎉 **Success Indicators**

✅ No import errors
✅ `embeddings.py` runs successfully
✅ Shows "384 dimensions"
✅ `migrate_embeddings.py` starts without errors

**Once fixed, continue with the migration!** 🚀
