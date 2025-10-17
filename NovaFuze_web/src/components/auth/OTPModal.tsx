import React, { useState, useEffect } from 'react';
import { sessionLogin } from '../../services/authApi';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';

import { Shield, Clock, RefreshCw, CheckCircle } from 'lucide-react';

interface OTPModalProps {
  show: boolean;
  onHide: () => void;
  confirmationResult: any;
  phoneNumber: string;
}

const OTPModal = ({ show, onHide, confirmationResult, phoneNumber }: OTPModalProps) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (show && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [show, countdown]);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setError(null);
    setIsVerifying(true);

    try {
      const userCredential = await confirmationResult.confirm(otp);
      const idToken = await userCredential.user.getIdToken();
      await sessionLogin(idToken);

      // Success - close modal and redirect
      onHide();
      window.location.hash = '#home';
      window.location.reload();
    } catch (error: any) {
      console.error('OTP verification error:', error);

      // Better error messages
      if (error.code === 'auth/invalid-verification-code') {
        setError('Invalid verification code. Please check and try again.');
      } else if (error.code === 'auth/code-expired') {
        setError('Verification code has expired. Please request a new one.');
      } else {
        setError('Verification failed. Please try again.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setCountdown(60);
    setError(null);
    // In a real implementation, you'd trigger a new OTP send here
    // For now, just reset the timer
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.length > 10) {
      return phone.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2-$3');
    }
    return phone;
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      contentClassName="border-0"
      style={{ zIndex: 1060 }}
    >
      <div style={{
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
      }}>
        <Modal.Header
          closeButton
          className="border-0 pb-2"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Modal.Title className="d-flex align-items-center">
            <Shield className="me-2" size={20} />
            Verify Your Phone
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 py-4" style={{ backgroundColor: '#fff' }}>
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
            {/* Header Info */}
            <motion.div variants={itemVariants} className="text-center mb-4">
              <p className="mb-2 text-muted">
                We've sent a 6-digit verification code to
              </p>
              <p className="fw-bold text-primary mb-0">
                {formatPhoneNumber(phoneNumber)}
              </p>
            </motion.div>

            <Form onSubmit={handleVerify}>
              <motion.div variants={itemVariants}>
                <Form.Group className="mb-4" controlId="formBasicOtp">
                  <Form.Label className="small fw-semibold text-muted mb-3 d-block text-center">
                    Enter Verification Code
                  </Form.Label>

                  {/* Modern OTP Input */}
                  <div className="d-flex justify-content-center mb-3">
                    <div className="d-flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          className="text-center"
                          style={{
                            width: '45px',
                            height: '50px',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            outline: 'none',
                            transition: 'all 200ms ease'
                          }}
                          value={otp[index] || ''}
                          onChange={(e) => {
                            const newOtp = otp.split('');
                            newOtp[index] = e.target.value;
                            setOtp(newOtp.join(''));

                            // Auto-focus next input
                            if (e.target.value && index < 5) {
                              const target = e.target as HTMLInputElement;
                              const nextInput = target.parentElement?.children[index + 1] as HTMLInputElement;
                              nextInput?.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            // Handle backspace
                            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                              const target = e.target as HTMLInputElement;
                              const prevInput = target.parentElement?.children[index - 1] as HTMLInputElement;
                              prevInput?.focus();
                            }
                            // Handle Enter key to submit
                            if (e.key === 'Enter' && otp.length === 6) {
                              handleVerify();
                            }
                            // Handle paste
                            if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
                              e.preventDefault();
                              navigator.clipboard.readText().then((text) => {
                                const pastedOtp = text.replace(/\D/g, '').slice(0, 6);
                                setOtp(pastedOtp);
                              });
                            }
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#6366f1';
                            e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </Form.Group>
              </motion.div>

              {error && (
                <motion.div variants={itemVariants}>
                  <Alert
                    variant="danger"
                    className="d-flex align-items-center text-center"
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
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="d-grid gap-2">
                <motion.button
                  whileHover={{ scale: isVerifying ? 1 : 1.02 }}
                  whileTap={{ scale: isVerifying ? 1 : 0.98 }}
                  type="submit"
                  disabled={isVerifying || otp.length !== 6}
                  className="btn"
                  style={{
                    background: isVerifying || otp.length !== 6
                      ? 'linear-gradient(90deg, #9ca3af, #9ca3af)'
                      : 'linear-gradient(90deg, #10b981, #059669)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 12,
                    padding: '12px 16px',
                    boxShadow: isVerifying || otp.length !== 6
                      ? 'none'
                      : '0 10px 24px rgba(16,185,129,0.35)',
                    transition: 'all 200ms ease',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isVerifying || otp.length !== 6 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isVerifying ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Verifying...
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center">
                      <CheckCircle size={18} className="me-2" />
                      Verify Code
                    </div>
                  )}
                </motion.button>

                {/* Resend OTP */}
                <div className="text-center mt-3">
                  {!canResend ? (
                    <small className="text-muted d-flex align-items-center justify-content-center">
                      <Clock size={14} className="me-1" />
                      Resend code in {countdown}s
                    </small>
                  ) : (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleResendOTP}
                      className="text-decoration-none p-0"
                      style={{ color: '#6366f1' }}
                    >
                      <RefreshCw size={14} className="me-1" />
                      Resend Code
                    </Button>
                  )}
                </div>
              </motion.div>
            </Form>

            {/* Security Info */}
            <motion.div variants={itemVariants} className="mt-4">
              <div
                className="d-flex align-items-center justify-content-center p-3 text-center"
                style={{
                  backgroundColor: '#f0f9ff',
                  borderRadius: 12,
                  border: '1px solid #e0f2fe'
                }}
              >
                <Shield size={16} className="me-2 text-primary" />
                <small className="text-muted mb-0">
                  Your phone number is secure and will not be shared
                </small>
              </div>
            </motion.div>
          </motion.div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default OTPModal;
