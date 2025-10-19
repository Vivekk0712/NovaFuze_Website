#!/usr/bin/env python3
"""Diagnostic script to find the exact error"""

import sys
import traceback

print("Python version:", sys.version)
print()

print("Step 1: Testing basic imports...")
try:
    import numpy
    print("✅ numpy works")
except Exception as e:
    print(f"❌ numpy failed: {e}")

try:
    import torch
    print("✅ torch works")
    print(f"   Torch version: {torch.__version__}")
except Exception as e:
    print(f"❌ torch failed: {e}")
    traceback.print_exc()

print()
print("Step 2: Testing sentence_transformers import...")
try:
    import sentence_transformers
    print("✅ sentence_transformers module found")
    print(f"   Version: {sentence_transformers.__version__}")
except Exception as e:
    print(f"❌ sentence_transformers import failed!")
    print(f"   Error: {e}")
    print()
    print("Full traceback:")
    traceback.print_exc()
    sys.exit(1)

print()
print("Step 3: Testing SentenceTransformer class...")
try:
    from sentence_transformers import SentenceTransformer
    print("✅ SentenceTransformer class imported")
except Exception as e:
    print(f"❌ SentenceTransformer class import failed!")
    print(f"   Error: {e}")
    print()
    print("Full traceback:")
    traceback.print_exc()
    sys.exit(1)

print()
print("=" * 60)
print("ALL IMPORTS SUCCESSFUL!")
print("=" * 60)
print()
print("Now you can run: python migrate_embeddings.py")
