import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebaseClient';
import OTPModal from './OTPModal';
import { Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (!auth) {
        setError('Authentication is not configured. Please set Firebase env vars.');
        return;
      }
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
      });
      const result = await signInWithPhoneNumber(auth, `+${phoneNumber}`, recaptchaVerifier);
      setConfirmationResult(result);
      setShowOtpModal(true);
    } catch (error: any) {
      setError(error.message);
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
      <motion.h5 variants={itemVariants} className="text-center mb-3">Sign In with Phone</motion.h5>
      <Form onSubmit={handleSignIn}>
        <motion.div variants={itemVariants}>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <div
              style={{
                borderRadius: 12,
                border: `1px solid ${isPhoneFocused ? '#6366f1' : 'rgba(0,0,0,0.1)'}`,
                boxShadow: isPhoneFocused ? '0 0 0 4px rgba(99,102,241,0.15)' : 'none',
                transition: 'box-shadow 160ms ease, border-color 160ms ease',
                padding: 6
              }}
            >
              <PhoneInput
                country={'in'}
                value={phoneNumber}
                onChange={setPhoneNumber}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
                inputStyle={{ width: '100%', border: 'none' }}
                buttonStyle={{ border: 'none' }}
              />
            </div>
          </Form.Group>
        </motion.div>

        {error && <motion.div variants={itemVariants}><Alert variant="danger">{error}</Alert></motion.div>}

        <motion.div variants={itemVariants} className="d-grid">
          <Button
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary-custom"
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 12,
              padding: '10px 14px',
              boxShadow: '0 10px 24px rgba(99,102,241,0.35)',
              transition: 'filter 160ms ease',
              filter: 'saturate(1.05)'
            }}
          >
            Send OTP
          </Button>
        </motion.div>
      </Form>
      <div id="recaptcha-container"></div>
      <OTPModal
        show={showOtpModal}
        onHide={() => setShowOtpModal(false)}
        confirmationResult={confirmationResult}
      />
    </motion.div>
  );
};

export default PhoneAuth;
