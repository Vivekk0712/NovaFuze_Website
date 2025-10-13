# NovaFuze-Tech Authentication Integration

This document describes the integration of the authentication system and MCP server with the NovaFuze-Tech website.

## Overview

The NovaFuze website now includes:
- Firebase Authentication (Email, Google, Phone)
- MCP Server integration for AI chat
- User profile management
- Protected routes

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the NovaFuze_web directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API Configuration
VITE_API_BASE_URL=http://localhost:4000
```

### 2. Install Dependencies

```bash
cd NovaFuze_web
npm install
```

### 3. Start the Services

#### Backend (Node.js)
```bash
cd backend
npm install
npm start
```

#### MCP Server (Python)
```bash
cd mcp_server
pip install -r requirements.txt
python main.py
```

#### NovaFuze Frontend
```bash
cd NovaFuze_web
npm run dev
```

## Features

### Authentication
- **Email/Password**: Sign up and sign in with email
- **Google OAuth**: One-click Google sign-in
- **Phone Authentication**: SMS OTP verification
- **Session Management**: Secure session cookies
- **Auto-login**: Persistent sessions

### AI Chat Integration
- **MCP Server**: AI-powered chat assistant
- **Chat History**: Persistent chat history per user
- **Fullscreen Mode**: Expandable chat interface
- **Real-time**: Instant responses

### User Interface
- **Profile Dropdown**: User avatar and profile options
- **Responsive Design**: Works on all devices
- **Theme Support**: Light/dark mode toggle
- **Modern UI**: Clean, professional design

## File Structure

```
NovaFuze_web/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   │   ├── EmailAuth.tsx
│   │   │   ├── GoogleSignIn.tsx
│   │   │   ├── PhoneAuth.tsx
│   │   │   └── OTPModal.tsx
│   │   ├── ChatBot.tsx     # AI chat component
│   │   ├── MCPToggle.tsx   # Chat toggle widget
│   │   ├── ProfileDropdown.tsx
│   │   └── Header.tsx      # Updated with auth
│   ├── hooks/
│   │   └── useAuth.ts      # Authentication hook
│   ├── pages/
│   │   └── LoginPage.tsx   # Login page
│   ├── services/
│   │   └── authApi.ts      # API service
│   └── firebaseClient.ts   # Firebase configuration
```

## Usage

### Login Flow
1. User visits the website
2. If not authenticated, shows login page
3. User can sign in with email, Google, or phone
4. After successful authentication, redirects to main website
5. User profile appears in top-right corner

### AI Chat
1. Purple chat button appears on the right side
2. Click to open AI assistant
3. Chat with the AI assistant
4. Chat history is saved per user
5. Can expand to fullscreen mode

### Profile Management
1. Click on profile avatar in header
2. View profile information
3. Access settings (placeholder)
4. Sign out option

## API Endpoints

### Authentication
- `POST /api/sessionLogin` - Create session from Firebase token
- `POST /api/sessionLogout` - Clear session
- `GET /api/me` - Get current user info

### Chat
- `POST /api/chat` - Send message to AI
- `GET /api/history` - Get chat history
- `DELETE /api/clear-chat` - Clear chat history

## Security

- Firebase Authentication handles user verification
- Session cookies are httpOnly and secure
- CORS configured for allowed origins
- User data is validated and sanitized

## Troubleshooting

### Common Issues

1. **Firebase not configured**: Check environment variables
2. **CORS errors**: Ensure backend allows NovaFuze origin
3. **Chat not working**: Verify MCP server is running
4. **Session issues**: Check cookie settings

### Development Tips

- Use browser dev tools to check network requests
- Check console for error messages
- Verify all services are running on correct ports
- Test authentication flow thoroughly

## Next Steps

- Implement user profile editing
- Add more AI capabilities
- Enhance chat features
- Add admin panel integration
