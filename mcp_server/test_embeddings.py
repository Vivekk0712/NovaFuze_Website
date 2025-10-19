#!/usr/bin/env python3
"""
Simple test script to verify sentence-transformers installation
"""

print("=" * 60)
print("Testing Sentence Transformers Installation")
print("=" * 60)
print()

# Test 1: Import
print("Test 1: Importing sentence_transformers...")
try:
    from sentence_transformers import SentenceTransformer
    print("✅ Import successful")
except Exception as e:
    print(f"❌ Import failed: {e}")
    exit(1)

print()

# Test 2: Load model
print("Test 2: Loading model 'all-MiniLM-L6-v2'...")
try:
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Model loading failed: {e}")
    exit(1)

print()

# Test 3: Generate embedding
print("Test 3: Generating embedding...")
try:
    text = "This is a test sentence"
    embedding = model.encode(text)
    print(f"✅ Embedding generated")
    print(f"   Dimensions: {len(embedding)}")
    print(f"   First 5 values: {embedding[:5]}")
except Exception as e:
    print(f"❌ Embedding generation failed: {e}")
    exit(1)

print()
print("=" * 60)
print("✅ ALL TESTS PASSED!")
print("=" * 60)
print()
print("Sentence Transformers is working correctly.")
print("You can now run: python migrate_embeddings.py")
print()
