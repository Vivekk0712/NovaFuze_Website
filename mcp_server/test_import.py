#!/usr/bin/env python3
"""Simple test to verify sentence-transformers installation"""

print("Testing sentence-transformers installation...")
print()

try:
    from sentence_transformers import SentenceTransformer
    print("✅ Import successful!")
    print()
    
    print("Loading model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("✅ Model loaded!")
    print()
    
    print("Generating test embedding...")
    embedding = model.encode("test text")
    print(f"✅ Embedding generated! Dimension: {len(embedding)}")
    print()
    
    print("=" * 60)
    print("SUCCESS! Sentence Transformers is working correctly!")
    print("=" * 60)
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
