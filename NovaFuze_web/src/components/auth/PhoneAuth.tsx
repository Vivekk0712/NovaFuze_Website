import React, { useState, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebaseClient';
import OTPModal from './OTPModal';
import { Form, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Shield, Phone, Loader2 } from 'lucide-react';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<any>(null);

  useEffect(() => {
    // Initialize reCAPTCHA verifier on component mount
    if (auth && !recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          setError('Security verification expired. Please try again.');
        }
      });
      setRecaptchaVerifier(verifier);
    }

    return () => {
      // Cleanup reCAPTCHA on unmount
      if (recaptchaVerifier) {
        recaptchaVerifier.clear();
      }
    };
  }, [recaptchaVerifier]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!auth) {
        setError('Authentication is not configured. Please set Firebase env vars.');
        return;
      }

      if (!phoneNumber || phoneNumber.length < 10) {
        setError('Please enter a valid phone number');
        return;
      }

      if (!recaptchaVerifier) {
        setError('Security verification not ready. Please refresh and try again.');
        return;
      }

      const result = await signInWithPhoneNumber(auth, `+${phoneNumber}`, recaptchaVerifier);
      setConfirmationResult(result);
      setShowOtpModal(true);
    } catch (error: any) {
      console.error('Phone auth error:', error);
      
      // Better error messages
      if (error.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number format. Please check and try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait a few minutes before trying again.');
      } else if (error.code === 'auth/captcha-check-failed') {
        setError('Security verification failed. Please refresh and try again.');
      } else {
        setError('Failed to send OTP. Please check your phone number and try again.');
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
          <Phone className="me-2" size={20} style={{ color: '#6366f1' }} />
          <h5 className="mb-0">Sign In with Phone</h5>
        </div>
        <p className="text-muted small mb-0">We'll send you a verification code</p>
      </motion.div>

      <Form onSubmit={handleSignIn}>
        <motion.div variants={itemVariants}>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label className="small fw-semibold text-muted mb-2">
              Phone Number
            </Form.Label>
            <div
              style={{
                borderRadius: 12,
                border: `2px solid ${isPhoneFocused ? '#6366f1' : 'rgba(0,0,0,0.1)'}`,
                boxShadow: isPhoneFocused ? '0 0 0 4px rgba(99,102,241,0.15)' : 'none',
                transition: 'all 200ms ease',
                padding: 8,
                backgroundColor: '#fff'
              }}
            >
              <PhoneInput
                country={'in'}
                value={phoneNumber}
                onChange={setPhoneNumber}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
                inputStyle={{ 
                  width: '100%', 
                  border: 'none',
                  fontSize: '16px',
                  backgroundColor: 'transparent',
                  outline: 'none'
                }}
                buttonStyle={{ 
                  border: 'none',
                  backgroundColor: 'transparent'
                }}
                containerStyle={{
                  width: '100%'
                }}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="d-flex align-items-center mt-2">
              <Shield size={14} className="me-1 text-success" />
              <small className="text-muted">Protected by reCAPTCHA</small>
            </div>
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
            disabled={isLoading || !phoneNumber}
            style={{
              background: isLoading 
                ? 'linear-gradient(90deg, #9ca3af, #9ca3af)' 
                : 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 16px',
              boxShadow: isLoading 
                ? 'none' 
                : '0 10px 24px rgba(99,102,241,0.35)',
              transition: 'all 200ms ease',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading || !phoneNumber ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <div className="d-flex align-items-center justify-content-center">
                <Loader2 size={18} className="me-2" style={{ animation: 'spin 1s linear infinite' }} />
                Sending OTP...
              </div>
            ) : (
              'Send Verification Code'
            )}
          </motion.button>
        </motion.div>
      </Form>
      
      {/* Hidden reCAPTCHA container */}
      <div id="recaptcha-container" style={{ display: 'none' }}></div>
      
      <OTPModal
        show={showOtpModal}
        onHide={() => {
          setShowOtpModal(false);
          setConfirmationResult(null);
        }}
        confirmationResult={confirmationResult}
        phoneNumber={phoneNumber}
      />
    </motion.div>
  );
};

export default PhoneAuth;
