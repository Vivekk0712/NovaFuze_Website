# 🪟 Windows-Specific Fix for Sentence Transformers

## 🎯 **The Problem**
Windows + Python 3.12 has compatibility issues with older versions of sentence-transformers that require Rust compiler.

## ✅ **Solution: Use Newer Versions with Pre-built Wheels**

### **Step 1: Clean Install**

```bash
cd mcp_server

# Uninstall all conflicting packages
pip uninstall -y sentence-transformers transformers huggingface-hub torch tokenizers

# Clear pip cache
pip cache purge
```

### **Step 2: Upgrade pip**

```bash
python -m pip install --upgrade pip
```

### **Step 3: Install Newer Compatible Versions**

```bash
# Install PyTorch first (CPU version for Windows)
pip install torch --index-url https://download.pytorch.org/whl/cpu

# Install sentence-transformers (will install compatible dependencies)
pip install sentence-transformers

# Verify installation
python -c "from sentence_transformers import SentenceTransformer; print('✅ Success!')"
```

---

## 🚀 **Quick One-Command Fix**

```bash
pip uninstall -y sentence-transformers transformers huggingface-hub torch tokenizers && pip cache purge && pip install torch --index-url https://download.pytorch.org/whl/cpu && pip install sentence-transformers && python -c "from sentence_transformers import SentenceTransformer; print('✅ Fixed!')"
```

---

## 🧪 **Test Installation**

```bash
# Test 1: Import
python -c "from sentence_transformers import SentenceTransformer; print('✅ Import works')"

# Test 2: Load model
python -c "from sentence_transformers import SentenceTransformer; m = SentenceTransformer('all-MiniLM-L6-v2'); print('✅ Model loaded')"

# Test 3: Generate embedding
python -c "from sentence_transformers import SentenceTransformer; m = SentenceTransformer('all-MiniLM-L6-v2'); e = m.encode('test'); print(f'✅ Embedding: {len(e)} dims')"
```

---

## 📦 **What Gets Installed**

With the newer versions:
- `sentence-transformers` >= 2.7.0 (has pre-built wheels)
- `transformers` >= 4.40.0 (compatible)
- `torch` >= 2.1.0 (CPU version for Windows)
- `tokenizers` (pre-built wheel, no Rust needed)

---

## ⚠️ **If Still Having Issues**

### **Option 1: Use Conda (Recommended for Windows)**

```bash
# Install Miniconda from: https://docs.conda.io/en/latest/miniconda.html

# Create new environment
conda create -n mcp python=3.11
conda activate mcp

# Install packages
conda install pytorch cpuonly -c pytorch
pip install sentence-transformers
pip install -r requirements.txt
```

### **Option 2: Use Python 3.11 Instead of 3.12**

Python 3.12 is very new and some packages don't have pre-built wheels yet.

```bash
# Download Python 3.11 from python.org
# Create new virtual environment with Python 3.11
python3.11 -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### **Option 3: Skip Semantic Embeddings (Temporary)**

If you just want to test the system, you can skip semantic embeddings for now:

```python
# The code already has a fallback!
# If sentence-transformers is not available, it uses hash-based embeddings
# Just run your application - it will work with reduced accuracy
```

---

## 🎯 **Recommended Approach for Windows**

```bash
# 1. Clean everything
pip uninstall -y sentence-transformers transformers huggingface-hub torch tokenizers
pip cache purge

# 2. Upgrade pip
python -m pip install --upgrade pip

# 3. Install PyTorch CPU version
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# 4. Install sentence-transformers
pip install sentence-transformers

# 5. Test
python embeddings.py
```

---

## ✅ **Success Indicators**

After successful installation:

```bash
python -c "from sentence_transformers import SentenceTransformer; print('✅ Working!')"
```

Should output:
```
✅ Working!
```

Then run:
```bash
python embeddings.py
```

Should output:
```
✅ Semantic embeddings enabled (Sentence Transformers)
Loading embedding model: all-MiniLM-L6-v2
Embedding model loaded successfully
Testing embedding generation...
Text: What is the project deadline?
Embedding dimension: 384
```

---

## 🔄 **After Fixing, Run Migration**

```bash
python migrate_embeddings.py
```

---

## 💡 **Pro Tip**

If you continue having issues, the system will automatically fall back to hash-based embeddings. While not as accurate, they still work! You can always upgrade later when you have more time to troubleshoot.

The fallback is already built into `file_tools.py`:
```python
try:
    from embeddings import generate_embedding
    print("✅ Semantic embeddings enabled")
except ImportError:
    print("⚠️ Using fallback hash-based embeddings")
    # Uses hash-based embeddings
```

---

## 📞 **Still Stuck?**

1. Check Python version: `python --version` (3.11 recommended for Windows)
2. Check pip version: `pip --version` (should be latest)
3. Try conda instead of pip
4. Use the fallback (hash-based) embeddings temporarily

**The system will work either way!** 🚀
