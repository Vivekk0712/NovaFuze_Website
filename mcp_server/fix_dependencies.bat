@echo off
echo ============================================================
echo Fixing Sentence Transformers Dependencies
echo ============================================================
echo.

echo Step 1: Uninstalling incompatible packages...
pip uninstall -y sentence-transformers huggingface-hub transformers torch

echo.
echo Step 2: Installing compatible versions...
pip install sentence-transformers==2.2.2
pip install transformers==4.30.2
pip install huggingface-hub==0.16.4

echo.
echo Step 3: Testing installation...
python -c "from sentence_transformers import SentenceTransformer; print('✅ Success! Sentence Transformers is working')"

echo.
echo ============================================================
echo Installation Complete!
echo ============================================================
echo.
echo You can now run: python migrate_embeddings.py
echo.
pause
