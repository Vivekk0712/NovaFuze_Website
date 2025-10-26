#!/bin/bash

# NovaFuze Frontend Deployment Script
# This script builds the frontend and prepares it for Hostinger deployment

echo "🚀 NovaFuze Frontend Deployment Script"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -d "NovaFuze_web" ]; then
    echo "❌ Error: NovaFuze_web directory not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

# Navigate to frontend directory
cd NovaFuze_web

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: npm install failed!"
    exit 1
fi

echo ""
echo "🔨 Building for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed!"
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "📁 Files ready in: NovaFuze_web/dist"
echo ""
echo "📋 Next steps:"
echo "1. Login to Hostinger File Manager"
echo "2. Navigate to public_html"
echo "3. Delete all existing files"
echo "4. Upload all files from NovaFuze_web/dist"
echo "5. Create .htaccess file (see HOSTINGER_DEPLOYMENT_GUIDE.md)"
echo ""
echo "Or use FTP:"
echo "1. Connect to ftp.yourdomain.com"
echo "2. Navigate to public_html"
echo "3. Upload all files from NovaFuze_web/dist"
echo ""
echo "🎉 Deployment preparation complete!"
