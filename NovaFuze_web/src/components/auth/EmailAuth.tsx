import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebaseClient';
import { sessionLogin } from '../../services/authApi';
import { Form, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, UserPlus, LogIn } from 'lucide-react';
import PasswordStrength from '../ui/PasswordStrength';

interface EmailAuthProps {
  initialMode?: 'signin' | 'signup';
}

const EmailAuth = ({ initialMode = 'signup' }: EmailAuthProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!auth) {
        setError('Authentication is not configured. Please set Firebase env vars.');
        return;
      }

      // Basic validation
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      const idToken = await userCredential.user.getIdToken();
      await sessionLogin(idToken);
      window.location.hash = '#home';
      window.location.reload();
    } catch (error: any) {
      console.error('Auth error:', error);
      
      // Better error messages
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Try signing in instead.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No account found with this email. Try signing up instead.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please wait a moment and try again.');
      } else {
        setError(isSignUp ? 'Failed to create account. Please try again.' : 'Failed to sign in. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      <motion.div variants={itemVariants} className="text-center mb-4">
        <div className="d-flex align-items-center justify-content-center mb-2">
          <Mail className="me-2" size={20} style={{ color: '#6366f1' }} />
          <h5 className="mb-0">{isSignUp ? 'Create Account' : 'Welcome Back'}</h5>
        </div>
        <p className="text-muted small mb-0">
          {isSignUp ? 'Join NovaFuze-Tech today' : 'Sign in to your account'}
        </p>
      </motion.div>

      <Form onSubmit={handleAuth}>
        <motion.div variants={itemVariants}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="small fw-semibold text-muted mb-2">
              Email Address
            </Form.Label>
            <div className="position-relative">
              <Mail 
                size={18} 
                className="position-absolute text-muted"
                style={{ 
                  left: 12, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  zIndex: 2
                }}
              />
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                style={{
                  borderRadius: 12,
                  border: `2px solid ${isEmailFocused ? '#6366f1' : 'rgba(0,0,0,0.1)'}`,
                  boxShadow: isEmailFocused ? '0 0 0 4px rgba(99,102,241,0.15)' : 'none',
                  transition: 'all 200ms ease',
                  padding: '12px 16px 12px 40px',
                  fontSize: '16px',
                  backgroundColor: isLoading ? '#f8f9fa' : '#fff'
                }}
              />
            </div>
          </Form.Group>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="small fw-semibold text-muted mb-2">
              Password
            </Form.Label>
            <div className="position-relative">
              <Lock 
                size={18} 
                className="position-absolute text-muted"
                style={{ 
                  left: 12, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  zIndex: 2
                }}
              />
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignUp ? 'Create a strong password' : 'Enter your password'}
                required
                disabled={isLoading}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                style={{
                  borderRadius: 12,
                  border: `2px solid ${isPasswordFocused ? '#6366f1' : 'rgba(0,0,0,0.1)'}`,
                  boxShadow: isPasswordFocused ? '0 0 0 4px rgba(99,102,241,0.15)' : 'none',
                  transition: 'all 200ms ease',
                  padding: '12px 50px 12px 40px',
                  fontSize: '16px',
                  backgroundColor: isLoading ? '#f8f9fa' : '#fff'
                }}
              />
              <button
                type="button"
                className="btn p-0 position-absolute"
                style={{ 
                  right: 12, 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'none',
                  color: '#6b7280'
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <PasswordStrength password={password} show={isSignUp && isPasswordFocused} />
          </Form.Group>
        </motion.div>

        {error && (
          <motion.div variants={itemVariants}>
            <Alert 
              variant="danger" 
              className="d-flex align-items-center"
              style={{ 
                borderRadius: 12,
                border: 'none',
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                fontSize: '14px'
              }}
            >
              <div>{error}</div>
            </Alert>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="d-grid">
          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="btn"
            type="submit"
            disabled={isLoading || !email || !password}
            style={{
              background: isLoading || !email || !password
                ? 'linear-gradient(90deg, #9ca3af, #9ca3af)' 
                : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 16px',
              boxShadow: isLoading || !email || !password
                ? 'none' 
                : '0 10px 24px rgba(99,102,241,0.35)',
              transition: 'all 200ms ease',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading || !email || !password ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <div className="d-flex align-items-center justify-content-center">
                <Loader2 size={18} className="me-2" style={{ animation: 'spin 1s linear infinite' }} />
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center">
                {isSignUp ? <UserPlus size={18} className="me-2" /> : <LogIn size={18} className="me-2" />}
                {isSignUp ? 'Create Account' : 'Sign In'}
              </div>
            )}
          </motion.button>
        </motion.div>
      </Form>
      
      <motion.div variants={itemVariants} className="text-center mt-4">
        <button
          type="button"
          className="btn btn-link p-0 text-decoration-none"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError(null);
            setPassword('');
          }}
          disabled={isLoading}
          style={{ 
            color: '#6366f1',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default EmailAuth;
