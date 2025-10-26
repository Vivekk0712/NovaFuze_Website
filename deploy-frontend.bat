@echo off
REM NovaFuze Frontend Deployment Script for Windows
REM This script builds the frontend and prepares it for Hostinger deployment

echo ========================================
echo NovaFuze Frontend Deployment Script
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "NovaFuze_web" (
    echo Error: NovaFuze_web directory not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

REM Navigate to frontend directory
cd NovaFuze_web

echo Installing dependencies...
call npm install

if errorlevel 1 (
    echo Error: npm install failed!
    pause
    exit /b 1
)

echo.
echo Building for production...
call npm run build

if errorlevel 1 (
    echo Error: Build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build successful!
echo ========================================
echo.
echo Files ready in: NovaFuze_web\dist
echo.
echo Next steps:
echo 1. Login to Hostinger File Manager
echo 2. Navigate to public_html
echo 3. Delete all existing files
echo 4. Upload all files from NovaFuze_web\dist
echo 5. Create .htaccess file (see HOSTINGER_DEPLOYMENT_GUIDE.md)
echo.
echo Or use FTP:
echo 1. Connect to ftp.yourdomain.com
echo 2. Navigate to public_html
echo 3. Upload all files from NovaFuze_web\dist
echo.
echo Deployment preparation complete!
echo.
pause
