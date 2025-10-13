import React, { useState } from 'react';
import { sessionLogin } from '../../services/authApi';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';

interface OTPModalProps {
  show: boolean;
  onHide: () => void;
  confirmationResult: any;
}

const OTPModal = ({ show, onHide, confirmationResult }: OTPModalProps) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await confirmationResult.confirm(otp);
      const idToken = await userCredential.user.getIdToken();
      await sessionLogin(idToken);
      window.location.hash = '#home'; // Set hash to home
      window.location.reload(); // Force page reload to establish session
    } catch (error: any) {
      setError(error.message);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Modal show={show} onHide={onHide} centered contentClassName="auth-card">
      <Modal.Header closeButton className="bg-dark text-light border-0">
        <Modal.Title>Enter OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
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
          <Form onSubmit={handleVerify}>
            <motion.div variants={itemVariants}>
              <Form.Group className="mb-3" controlId="formBasicOtp">
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
              </Form.Group>
            </motion.div>
            {error && <motion.div variants={itemVariants}><Alert variant="danger">{error}</Alert></motion.div>}
            <motion.div variants={itemVariants} className="d-grid">
              <Button as={motion.button} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary-custom" type="submit">
                Verify
              </Button>
            </motion.div>
          </Form>
        </motion.div>
      </Modal.Body>
    </Modal>
  );
};

export default OTPModal;
