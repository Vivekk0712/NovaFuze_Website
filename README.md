# 🚀 NovaFuze-Tech - Complete Full-Stack Application

A comprehensive full-stack application with authentication, payments, AI chat, and admin management. Built with React (frontend), Node.js + Express (backend), Python FastAPI (MCP server), Firebase Authentication, Supabase database, and Razorpay payments.

## ✨ Features

### 🔐 **Authentication System**
- Phone OTP (with Firebase reCAPTCHA)
- Google Sign-In
- Email/Password login with strength validation
- Account linking (phone + Google + email)
- Secure session cookies (HttpOnly, Secure, SameSite=Strict)
- Professional UI with modern animations

### 💳 **Payment Integration**
- Razorpay payment gateway integration
- One-time ₹2 LiveEazy product purchase
- Subscription management system
- Payment history tracking
- Automatic email confirmations
- Test and production mode support

### 🤖 **AI Chat Assistant**
- Powered by Gemini 2.5 Pro
- ChatGPT-style conversation management
- Context isolation per conversation
- User-aware AI responses
- File upload and processing
- Vector search capabilities

### 👨‍💼 **Admin Management**
- Admin authentication system
- File management dashboard
- User management
- Payment tracking
- Admin-only routes and permissions

### 📧 **Email Notifications**
- Payment confirmation emails
- Professional HTML templates
- Gmail/SMTP support
- Error handling and logging

## 🛠️ Prerequisites

- **Node.js** >= 18
- **Python** 3.10+ and pip
- **Firebase project** (free tier sufficient)
- **Supabase account** (for database)
- **Razorpay account** (for payments)
- **Gmail account** (for email notifications)
- **Gemini API key** (for AI functionality)
- **Firebase CLI**: `npm install -g firebase-tools`

## 🚀 Quick Start

### 1. **Clone the Repository**

```bash
git clone https://github.com/your-username/novafuze-tech.git
cd novafuze-tech
```

### 2. **Install Dependencies**

```bash
# Backend
cd backend && npm install

# Frontend
cd ../NovaFuze_web && npm install

# MCP Server (Python)
cd ../mcp_server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 🔧 Configuration Setup

### 3. **Firebase Project Setup**

#### a. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and create a new project
3. Enable **Authentication**, **Firestore**, and **Storage**

#### b. Enable Authentication Providers
1. Go to **Authentication** → **Sign-in method**
2. Enable: **Email/Password**, **Google**, **Phone**

#### c. Get Configuration Keys
1. **Project Settings** → **General** → **Your apps**
2. Click Web icon (`</>`) to create web app
3. Copy the `firebaseConfig` values

#### d. Service Account Setup
1. **Project Settings** → **Service accounts**
2. Click "Generate new private key"
3. Save as `serviceAccount.json` in `backend/` directory

#### e. reCAPTCHA Setup
1. Go to [Google Cloud Console reCAPTCHA](https://console.cloud.google.com/security/recaptcha)
2. Create reCAPTCHA v3 key
3. Copy the Site Key

### 4. **Supabase Database Setup**

#### a. Create Supabase Project
1. Go to [Supabase Dashboard](https://app.supabase.io/)
2. Create new project
3. Go to **Settings** → **API**
4. Copy **Project URL** and **Service Role Key**

#### b. Setup Database Schema
1. Go to **SQL Editor** in Supabase
2. Copy content from `mcp_server/db/schema.sql`
3. Paste and **Run** the SQL script

#### c. Setup Storage Buckets (Required for File Uploads)
```bash
cd mcp_server
source venv/bin/activate  # Windows: venv\Scripts\activate
python setup_storage.py
```

**What this does:**
- Creates `files` storage bucket in Supabase
- Configures file type restrictions (PDF, DOC, TXT, etc.)
- Sets 50MB file size limit
- Enables secure file storage for AI chat and admin features

**Expected output:**
```
🚀 Supabase Storage Setup
Successfully created bucket: files
Supported file types:
- application/pdf
- text/plain
- application/vnd.openxmlformats-officedocument.wordprocessingml.document
- [... other supported types]
```

### 5. **Razorpay Payment Setup**

#### a. Create Razorpay Account
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Sign up and switch to **Test Mode**
3. Go to **Settings** → **API Keys**
4. Generate and copy **Key ID** and **Key Secret**

### 6. **Email Configuration**

#### a. Gmail Setup (Recommended)
1. Enable 2-Factor Authentication on Gmail
2. Go to **Security** → **App passwords**
3. Generate app password for "Mail"
4. Copy the 16-character password

### 7. **Gemini API Setup**
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create new API key
3. Copy the API key

## 📝 Environment Variables

Create `.env` files in each directory:

### **`NovaFuze_web/.env`**
```env
VITE_API_BASE_URL=http://localhost:4000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### **`backend/.env`**
```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Firebase Configuration
FIREBASE_PROJECT_ID=your_project_id
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json

# Session Configuration
SESSION_COOKIE_NAME=__session
SESSION_EXPIRES_IN=432000000

# Razorpay Configuration (Test Mode)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_business_email@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM_NAME=NovaFuze-Tech
EMAIL_FROM_ADDRESS=your_business_email@gmail.com

# MCP Server
MCP_SERVER_URL=http://localhost:8000
```

### **`mcp_server/.env`**
```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI Configuration
GEMINI_API_KEY=your_gemini_api_key

# Environment
NODE_ENV=development
```

## 🎯 Initial Setup Commands

### 8. **Setup Supabase Storage**
```bash
cd mcp_server
source venv/bin/activate  # Windows: venv\Scripts\activate
python setup_storage.py
```
This creates storage buckets for file uploads and AI document processing.

### 9. **Create Admin User**
```bash
cd mcp_server
python create_admin.py
```
Follow the prompts to create your first admin user.

### 10. **Deploy Firestore Rules**
```bash
firebase deploy --only firestore:rules
```

## 🏃‍♂️ Running the Application

Start all three services in separate terminals:

### **Terminal 1 - Backend**
```bash
cd backend
npm run dev
```
Server starts on `http://localhost:4000`

### **Terminal 2 - MCP Server**
```bash
cd mcp_server
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn main:app --reload
```
Server starts on `http://localhost:8000`

### **Terminal 3 - Frontend**
```bash
cd NovaFuze_web
npm run dev
```
Server starts on `http://localhost:5173`

## 🧪 Testing the Application

### **Test Authentication**
1. Navigate to `http://localhost:5173`
2. Try all auth methods: Email, Phone, Google
3. Test with these credentials:
   - **Email**: test@example.com / password123
   - **Phone**: Use any number with test OTP
   - **Google**: Use your Google account

### **Test Payments**
1. Go to Products section
2. Click "Get Started" on LiveEazy (₹2)
3. Use Razorpay test credentials:
   - **Card**: 4111 1111 1111 1111
   - **Expiry**: 12/25
   - **CVV**: 123

### **Test AI Chat**
1. Login to the application
2. Navigate to Chat section
3. Start a conversation with the AI
4. Test file uploads and questions

### **Test Admin Panel**
1. Go to `/admin` route
2. Login with admin credentials created earlier
3. Test file management and user oversight

## 📁 Project Structure

```
novafuze-tech/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── middleware/     # Auth & validation
│   └── serviceAccount.json # Firebase credentials
├── NovaFuze_web/           # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   └── hooks/          # Custom hooks
│   └── public/
├── mcp_server/             # Python FastAPI server
│   ├── tools/              # AI tools & utilities
│   ├── db/                 # Database schemas
│   └── create_admin.py     # Admin setup script
├── docs/                   # Documentation
└── README.md              # This file
```

## 🔒 Security Features

- **Authentication**: Firebase Auth with session cookies
- **Authorization**: Role-based access control
- **Payment Security**: Razorpay signature verification
- **Data Protection**: Firestore security rules
- **Email Security**: App passwords and secure SMTP
- **API Security**: CORS, rate limiting, input validation

## 🎨 UI/UX Features

- **Modern Design**: Professional, responsive interface
- **Animations**: Smooth Framer Motion animations
- **Loading States**: Comprehensive loading indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: Full keyboard navigation and screen reader support
- **Mobile Responsive**: Optimized for all device sizes

## 🚀 Production Deployment

### **Environment Setup**
1. Switch Razorpay to Live Mode
2. Use production Firebase project
3. Configure production Supabase
4. Set up custom domain email
5. Update environment variables

### **Security Checklist**
- [ ] Enable Firestore security rules
- [ ] Use HTTPS for all endpoints
- [ ] Secure environment variables
- [ ] Enable CORS properly
- [ ] Set up monitoring and logging

## 🛠️ Troubleshooting

### **Common Issues**

**Authentication not working:**
- Check Firebase configuration
- Verify reCAPTCHA keys
- Ensure service account is properly set

**Payments failing:**
- Verify Razorpay keys are correct
- Check test mode vs live mode
- Ensure webhook signatures match

**AI chat not responding:**
- Check Gemini API key
- Verify Supabase connection
- Ensure MCP server is running

**File uploads failing:**
- Run `python setup_storage.py` to create storage buckets
- Check Supabase storage permissions
- Verify file types are supported (PDF, DOC, TXT, etc.)
- Ensure file size is under 50MB limit

**Emails not sending:**
- Verify Gmail app password
- Check email service configuration
- Ensure 2FA is enabled on Gmail

### **Debug Commands**

```bash
# Check backend logs
cd backend && npm run dev

# Check MCP server logs
cd mcp_server && uvicorn main:app --reload --log-level debug

# Test database connection
cd mcp_server && python -c "from supabase_client import init_supabase; print('DB OK' if init_supabase() else 'DB Failed')"

# Test email configuration
cd backend && node test-email.js

# Test payment endpoints
cd backend && node test-payment.js
```

## 📚 API Documentation

### **Authentication Endpoints**
- `POST /api/auth/session-login` - Create session
- `POST /api/auth/session-logout` - Destroy session
- `GET /api/auth/verify-session` - Verify session

### **Payment Endpoints**
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify-payment` - Verify payment
- `GET /api/payment/subscription-status` - Get subscription
- `GET /api/payment/payment-history` - Get payment history

### **Admin Endpoints**
- `POST /api/admin/login` - Admin login
- `GET /api/admin/files` - List files
- `DELETE /api/admin/files/:id` - Delete file
- `GET /api/admin/stats` - Get statistics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@novafuze-tech.com
- 📱 Phone: +91-XXXXXXXXXX
- 🌐 Website: [novafuze-tech.com](https://novafuze-tech.com)

---

**🎉 Congratulations!** You now have a complete full-stack application with authentication, payments, AI chat, and admin management running locally!
