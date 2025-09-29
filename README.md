# Firebase Auth App — Phone, Google & Email/Password

A minimal authentication system built with React (frontend), Node.js + Express (backend), and Firebase Authentication. Supports Phone OTP, Google Sign-In, and Email/Password with account linking. Uses session cookies for secure persistence and stores user profiles in Firestore.

## Features

- Phone OTP (with Firebase reCAPTCHA)
- Google Sign-In
- Email/Password login
- Account linking (phone + Google + email)
- Secure session cookies (HttpOnly, Secure, SameSite=Strict)
- Firestore rules enforce per-user isolation
- Ready for Firebase Emulator Suite

## Prerequisites

- Node.js >= 18
- A Firebase project (the free tier is sufficient)
- Firebase CLI (`npm install -g firebase-tools`)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/my-auth-app.git
cd my-auth-app
```

### 2. Install Dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Firebase Project Setup

#### a. Create a Firebase Project
1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click on "Add project" and follow the steps to create a new project.

#### b. Enable Authentication Providers
1.  In your new project, go to the **Authentication** section (from the left-hand menu).
2.  Click on the "Sign-in method" tab.
3.  Enable the following providers:
    *   **Email/Password**
    *   **Google**
    *   **Phone**

#### c. Get Frontend Configuration
1.  Go to your **Project Settings** (click the gear icon next to "Project Overview").
2.  In the "General" tab, scroll down to "Your apps".
3.  Click on the **Web** icon (`</>`) to create a new web app.
4.  Give it a nickname and register the app.
5.  Firebase will give you a `firebaseConfig` object. You will need these values for your `frontend/.env` file.

#### d. Get Backend Configuration (Service Account)
1.  In your **Project Settings**, go to the "Service accounts" tab.
2.  Click on "Generate new private key". This will download a JSON file.
3.  Rename this file to `serviceAccount.json` and place it in the `backend` directory.

#### e. Get reCAPTCHA Key for Phone Auth
1.  Phone authentication uses reCAPTCHA to prevent abuse.
2.  Go to the [Google Cloud Console](https://console.cloud.google.com/security/recaptcha) and set up a new reCAPTCHA v3 key.
3.  You will get a "Site Key". This is the value for `VITE_RECAPTCHA_SITE_KEY` in your `frontend/.env` file.

#### f. Set up Firestore
1.  In the Firebase Console, go to the **Firestore Database** section.
2.  Click "Create database" and start in **test mode**.

### 4. Configure Environment Variables

Create a `.env` file in both the `frontend` and `backend` directories. You can copy the contents from the `.env.example` files.

**`backend/.env`**
```
PORT=4000
FIREBASE_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json
SESSION_COOKIE_NAME=__session
SESSION_EXPIRES_IN=432000000   # 5 days in ms
NODE_ENV=development
```

**`frontend/.env`**
```
VITE_API_BASE_URL=http://localhost:4000
VITE_FIREBASE_API_KEY=your-api-key-from-step-3c
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key-from-step-3e
```

### 5. Deploy Firestore Rules

To deploy the security rules for Firestore, run the following command from the root of the project:

```bash
firebase deploy --only firestore:rules
```

## Running the Application

### Start Backend
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd frontend
npm run dev
```

### Run with Firebase Emulator
To develop locally without connecting to your live Firebase project, you can use the Firebase Emulator Suite.

```bash
firebase emulators:start --only auth,firestore
```

## Repository Structure

```
/my-auth-app
  /backend
    /src
  /frontend
    /src
  /docs
  README.md
  firebase.json
  firebase.rules
```

## Testing

- **Unit tests:** Jest + Supertest (backend), React Testing Library (frontend)
- **E2E:** Playwright or Cypress with Firebase Emulator

## Security

- Session cookies are HttpOnly, Secure, SameSite=Strict
- reCAPTCHA required for phone OTP
- Strong password policy for email/password
- Firestore rules prevent cross-user access

## Roadmap

- Password reset & email verification
- Roles (admin/user)
- Multi-factor auth (MFA)
- Deployment (Netlify + Render/Cloud Run)

## License

MIT
