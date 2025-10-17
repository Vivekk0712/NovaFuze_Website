import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebaseClient';
import { sessionLogin } from '../../services/authApi';
import { Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const GoogleSignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      if (!auth) {
        setError('Authentication is not configured. Please set Firebase env vars.');
        return;
      }
      
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      await sessionLogin(idToken);
      window.location.hash = '#home';
      window.location.reload();
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      // Better error messages
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Pop-up was blocked. Please allow pop-ups and try again.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        setError('Sign-in was cancelled. Please try again.');
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="d-grid"
    >
      <motion.button
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="btn d-flex align-items-center justify-content-center"
        disabled={isLoading}
        onClick={handleSignIn}
        style={{
          background: isLoading 
            ? '#ffffff'
            : '#ffffff',
          color: isLoading ? '#9ca3af' : '#374151',
          border: '2px solid #e5e7eb',
          borderRadius: 12,
          padding: '12px 16px',
          boxShadow: isLoading 
            ? 'none'
            : '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'all 200ms ease',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          position: 'relative'
        }}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="me-2" style={{ animation: 'spin 1s linear infinite' }} />
            Signing In...
          </>
        ) : (
          <>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              className="me-2"
            >
              <path 
                fill="#4285F4" 
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path 
                fill="#34A853" 
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path 
                fill="#FBBC05" 
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path 
                fill="#EA4335" 
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </>
        )}
      </motion.button>
      
      {error && (
        <Alert 
          variant="danger" 
          className="mt-3 d-flex align-items-center"
          style={{ 
            borderRadius: 12,
            border: 'none',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            fontSize: '14px'
          }}
        >
          {error}
        </Alert>
      )}
    </motion.div>
  );
};

export default GoogleSignIn;
