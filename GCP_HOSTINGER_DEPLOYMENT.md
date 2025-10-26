# 🚀 Complete Deployment Guide: Google Cloud VM + Hostinger

Deploy Backend & MCP on Google Cloud VM, Frontend on Hostinger.

---

## 🎯 Deployment Architecture

```
Frontend (React) → Hostinger (yourdomain.com)
Backend (Node.js) → Google Cloud VM (api.yourdomain.com)
MCP Server (Python) → Google Cloud VM (same server)
Database → Supabase (already configured)
```

**Your VM Specs:**
- Instance: e2-medium
- vCPU: 2 (better than c4a-standard-1!)
- RAM: 4 GB
- Region: Mumbai (asia-south1)
- OS: Ubuntu 22.04 LTS

**Why e2-medium is great:**
- ✅ 2 vCPUs (vs 1 in c4a) = Better performance
- ✅ Same 4 GB RAM
- ✅ Similar cost (~$24/month)
- ✅ Available in Mumbai region
- ✅ Perfect for Node.js + Python workload

---

## 📦 Part 1: Setup Google Cloud VM

### Step 1: Create VM Instance

1. Go to **Google Cloud Console**: https://console.cloud.google.com
2. Navigate to **Compute Engine** → **VM instances**
3. Click **"Create Instance"**

**Configuration:**
```
Name: novafuze-server
Region: asia-south1 (Mumbai)
Zone: asia-south1-a (or asia-south1-b, asia-south1-c)
Machine type: e2-medium (2 vCPU, 4 GB RAM)
Boot disk: Ubuntu 22.04 LTS, 20 GB
Firewall: ✓ Allow HTTP traffic
         ✓ Allow HTTPS traffic
```

4. Click **"Create"**
5. Wait for VM to start (1-2 minutes)

### Step 2: Configure Firewall Rules

1. Go to **VPC Network** → **Firewall**
2. Click **"Create Firewall Rule"**

**Rule 1: Allow Backend (Port 3000)**
```
Name: allow-backend
Direction: Ingress
Targets: All instances
Source IP ranges: 0.0.0.0/0
Protocols and ports: tcp:3000
```

**Rule 2: Allow MCP (Port 8000)**
```
Name: allow-mcp
Direction: Ingress
Targets: All instances
Source IP ranges: 0.0.0.0/0
Protocols and ports: tcp:8000
```

### Step 3: Reserve Static IP

1. Go to **VPC Network** → **IP addresses**
2. Click **"Reserve External Static Address"**
```
Name: novafuze-ip
Region: asia-south1
Attached to: novafuze-server
```
3. Note the IP address (e.g., 34.93.xxx.xxx)

---

## 💻 Part 2: Setup Server Environment

### Step 1: Connect to VM

**Option A: Browser SSH (Easiest)**
1. Go to **Compute Engine** → **VM instances**
2. Click **"SSH"** button next to your instance
3. Browser terminal opens

**Option B: gcloud CLI**
```bash
gcloud compute ssh novafuze-server --zone=asia-south1-a
```

### Step 2: Update System

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y git curl wget nano
```

### Step 3: Install Node.js

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x
```

### Step 4: Install Python & pip

```bash
# Check current Python version
python3 --version

# If you have Python 3.12, install Python 3.11 instead
sudo apt update
sudo apt install -y software-properties-common
sudo add-apt-repository -y ppa:deadsnakes/ppa
sudo apt update

# Install Python 3.11 (compatible with all dependencies)
sudo apt install -y python3.11 python3.11-venv python3.11-dev

# Verify Python 3.11 installation
python3.11 --version  # Should show Python 3.11.x

# Install pip for Python 3.11
curl -sS https://bootstrap.pypa.io/get-pip.py | python3.11

# Verify pip
python3.11 -m pip --version

# Note: We use Python 3.11 because torch==2.2.0 and sentence-transformers==2.7.0
# are fully tested with Python 3.11 (Python 3.12 may have compatibility issues)
```

### Step 5: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

### Step 6: Install Nginx (Reverse Proxy)

```bash
# Install Nginx
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

---

## 🖥️ Part 3: Deploy Backend (Node.js)

### Step 1: Upload Backend Code

**Option A: Git Clone (Recommended)**
```bash
# Navigate to home directory
cd ~

# Clone your repository
git clone https://github.com/yourusername/NF_Website.git
cd NF_Website/backend
```

**Option B: Upload via SCP (from local machine)**
```bash
# On your local machine
gcloud compute scp --recurse backend/ novafuze-server:~/backend --zone=asia-south1-a
```

### Step 2: Upload Firebase Service Account

You need to upload your `serviceAccount.json` file to the backend folder.

**Option A: Upload via SCP (from local machine)**
```bash
# On your local machine (where serviceAccount.json is located)
gcloud compute scp backend/serviceAccount.json novafuze-server:~/NF_Website/backend/ --zone=asia-south1-a
```

**Option B: Copy-paste content**
```bash
# On VM
cd ~/NF_Website/backend
nano serviceAccount.json
# Paste the content from your local serviceAccount.json
# Save: Ctrl + X, Y, Enter
```

### Step 3: Install Dependencies

```bash
cd ~/NF_Website/backend
npm install --production
```

### Step 3: Create Environment File

```bash
nano .env
```

Add (copy from your local `backend/.env` and update for production):
```env
# Server Configuration
PORT=3000
FIREBASE_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json
SESSION_COOKIE_NAME=__session
SESSION_EXPIRES_IN=432000000   # 5 days in ms
MCP_SERVER_URL=http://localhost:8000
NODE_ENV=production
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM_NAME=NovaFuze-Tech
EMAIL_FROM_ADDRESS=your_email@gmail.com
```

Save: `Ctrl + X`, `Y`, `Enter`

**Important:** You also need to upload `serviceAccount.json` file!

### Step 4: Start Backend with PM2

```bash
# Start backend
pm2 start src/index.js --name novafuze-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Copy and run the command it shows

# Check status
pm2 status
pm2 logs novafuze-backend
```

### Step 5: Test Backend

```bash
# Test locally
curl http://localhost:3000/api/health

# Should return: {"status":"ok"} or similar
```

---

## 🐍 Part 4: Deploy MCP Server (Python)

### Step 1: Navigate to MCP Directory

```bash
cd ~/NF_Website/mcp_server
```

### Step 2: Create Virtual Environment

```bash
# Create venv
python3 -m venv venv

# Activate venv
source venv/bin/activate

# Install production dependencies (CPU-optimized)
pip install -r requirements-prod.txt

# Note: This uses CPU-only PyTorch which is smaller and faster for deployment
```

### Step 3: Create Environment File

```bash
nano .env
```

Add (copy from your local `mcp_server/.env`):
```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
JWT_SECRET_KEY=

```

Save: `Ctrl + X`, `Y`, `Enter`

### Step 4: Start MCP with PM2

```bash
# Start MCP server
pm2 start "venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000" --name novafuze-mcp

# Save configuration
pm2 save

# Check status
pm2 status
pm2 logs novafuze-mcp
```

### Step 5: Test MCP

```bash
# Test locally
curl http://localhost:8000/health

# Should return health status
```

---

## 🌐 Part 5: Configure Nginx Reverse Proxy

### Step 1: Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/novafuze
```

Add:
```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# MCP Server
server {
    listen 80;
    server_name mcp.yourdomain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Save: `Ctrl + X`, `Y`, `Enter`

### Step 2: Enable Configuration

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/novafuze /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔐 Part 6: Setup SSL (HTTPS)

### Step 1: Install Certbot

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx
```

### Step 2: Get SSL Certificates

```bash
# Get certificates for both subdomains
sudo certbot --nginx -d api.yourdomain.com -d mcp.yourdomain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)
```

### Step 3: Auto-Renewal

```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Certbot automatically sets up cron job for renewal
```

---

## 🌍 Part 7: Configure DNS (Hostinger)

### Step 1: Add DNS Records

Login to Hostinger → Domains → DNS

**Add these records:**

**Record 1: API Subdomain**
```
Type: A
Name: api
Value: 34.93.xxx.xxx (your GCP VM IP)
TTL: 14400
```

**Record 2: MCP Subdomain**
```
Type: A
Name: mcp
Value: 34.93.xxx.xxx (same GCP VM IP)
TTL: 14400
```

**Wait 5-30 minutes for DNS propagation**

### Step 2: Test DNS

```bash
# On your local machine
nslookup api.yourdomain.com
nslookup mcp.yourdomain.com

# Should return your GCP VM IP
```

---

## 📱 Part 8: Deploy Frontend (Hostinger)

### Step 1: Build Frontend

```bash
# On your local machine
cd NovaFuze_web

# Update .env.production
nano .env.production
```

Add:
```env
VITE_API_URL=https://api.yourdomain.com
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxx
```

```bash
# Build
npm install
npm run build
```

### Step 2: Upload to Hostinger

**Via File Manager:**
1. Login to Hostinger hPanel
2. Go to **File Manager**
3. Navigate to `public_html`
4. **Delete all existing files**
5. Upload all files from `NovaFuze_web/dist`

**Via FTP:**
1. Connect to `ftp.yourdomain.com`
2. Navigate to `public_html`
3. Delete all files
4. Upload `NovaFuze_web/dist/*`

### Step 3: Create .htaccess

In `public_html/.htaccess`:
```apache
# React Router Support
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# GZIP Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

## ✅ Part 9: Testing

### Test Frontend
```
Visit: https://yourdomain.com
Should load your React app
```

### Test Backend
```
Visit: https://api.yourdomain.com/api/health
Should return: {"status":"ok"}
```

### Test MCP
```
Visit: https://mcp.yourdomain.com/health
Should return health status
```

### Test Full Flow
1. Visit your website
2. Sign up/Login
3. Upload a file
4. Use chatbot
5. Make a payment

---

## 🔧 Part 10: Maintenance & Monitoring

### PM2 Commands

```bash
# View status
pm2 status

# View logs
pm2 logs novafuze-backend
pm2 logs novafuze-mcp

# Restart services
pm2 restart novafuze-backend
pm2 restart novafuze-mcp

# Stop services
pm2 stop novafuze-backend
pm2 stop novafuze-mcp

# Monitor resources
pm2 monit
```

### Update Backend

```bash
# SSH into VM
cd ~/NF_Website
git pull
cd backend
npm install
pm2 restart novafuze-backend
```

### Update MCP

```bash
cd ~/NF_Website/mcp_server
source venv/bin/activate
git pull
pip install -r requirements.txt
pm2 restart novafuze-mcp
```

### Update Frontend

```bash
# Local machine
cd NovaFuze_web
npm run build

# Upload dist/* to Hostinger public_html
```

### Check Server Resources

```bash
# CPU and RAM usage
htop

# Disk usage
df -h

# Network usage
sudo iftop
```

---

## 💰 Cost Estimate

### Google Cloud (with $300 credit):
```
e2-medium: ~$24/month
Static IP: $3/month
Egress: ~$5/month
Total: ~$32/month

With $300 credit: FREE for 9+ months!
```

### Hostinger:
```
Your current plan: $2-10/month
```

### Total Monthly Cost:
```
First 9+ months: $2-10/month (Hostinger only)
After credit: $34-42/month
```

---

## 📋 Complete Checklist

### Google Cloud VM:
- [ ] VM instance created
- [ ] Firewall rules configured
- [ ] Static IP reserved
- [ ] Node.js installed
- [ ] Python installed
- [ ] PM2 installed
- [ ] Nginx installed

### Backend:
- [ ] Code uploaded
- [ ] Dependencies installed
- [ ] .env configured
- [ ] PM2 running
- [ ] Accessible via API subdomain

### MCP Server:
- [ ] Code uploaded
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] .env configured
- [ ] PM2 running
- [ ] Accessible via MCP subdomain

### Frontend:
- [ ] Built with production env
- [ ] Uploaded to Hostinger
- [ ] .htaccess created
- [ ] Accessible via main domain

### DNS & SSL:
- [ ] DNS records added
- [ ] SSL certificates installed
- [ ] HTTPS working

### Testing:
- [ ] Frontend loads
- [ ] Backend API works
- [ ] MCP server responds
- [ ] Login/Signup works
- [ ] Chatbot works
- [ ] Payments work

---

## 🆘 Troubleshooting

### Backend not accessible:
```bash
# Check if running
pm2 status

# Check logs
pm2 logs novafuze-backend

# Check port
sudo netstat -tulpn | grep 3000

# Restart
pm2 restart novafuze-backend
```

### MCP not accessible:
```bash
# Check if running
pm2 status

# Check logs
pm2 logs novafuze-mcp

# Restart
pm2 restart novafuze-mcp
```

### Nginx issues:
```bash
# Check configuration
sudo nginx -t

# Check logs
sudo tail -f /var/log/nginx/error.log

# Restart
sudo systemctl restart nginx
```

### SSL issues:
```bash
# Renew certificates
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

### Python dependency issues:
```bash
# Check Python version
python3 --version

# If you have Python 3.12, downgrade to 3.10:
sudo apt install -y python3.10 python3.10-venv python3.10-dev
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 1

# Recreate virtual environment
cd ~/NF_Website/mcp_server
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements-prod.txt
```

---

## 🎉 Success!

Your application is now deployed:
- ✅ Frontend on Hostinger
- ✅ Backend on Google Cloud
- ✅ MCP on Google Cloud
- ✅ HTTPS enabled
- ✅ Production ready

**Your URLs:**
- Frontend: https://yourdomain.com
- Backend API: https://api.yourdomain.com
- MCP Server: https://mcp.yourdomain.com

---

**Deployment complete! Your app is live! 🚀**
