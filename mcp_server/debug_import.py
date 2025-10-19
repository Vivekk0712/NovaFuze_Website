import sys
import traceback

print("Python version:", sys.version)
print("Python executable:", sys.executable)
print()
print("Attempting to import sentence_transformers...")
print()

try:
    import sentence_transformers
    print("✅ SUCCESS! sentence_transformers imported")
    print("Version:", sentence_transformers.__version__)
    print("Location:", sentence_transformers.__file__)
except Exception as e:
    print("❌ FAILED to import")
    print("Error type:", type(e).__name__)
    print("Error message:", str(e))
    print()
    print("Full traceback:")
    traceback.print_exc()
