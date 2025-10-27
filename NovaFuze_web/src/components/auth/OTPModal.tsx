import React, { useState, useEffect } from 'react';
import { sessionLogin } from '../../services/authApi';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Clock, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface OTPModalProps {
  show: boolean;
  onHide: () => void;
  confirmationResult: any;
  phoneNumber: string;
}

const OTPModal = ({ show, onHide, confirmationResult, phoneNumber }: OTPModalProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
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

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setError(null);
    setIsVerifying(true);

    try {
      const userCredential = await confirmationResult.confirm(otpString);
      const idToken = await userCredential.user.getIdToken();
      await sessionLogin(idToken);

      // Success - close modal and redirect
      onHide();
      window.location.href = window.location.origin;
    } catch (error: any) {
      console.error('OTP verification error:', error);

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

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when all 6 digits are entered
    if (index === 5 && value && newOtp.every(digit => digit !== '')) {
      setTimeout(() => handleVerify(), 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);

    // Focus last filled input or first empty
    const lastIndex = Math.min(pastedData.length, 5);
    const targetInput = document.getElementById(`otp-${lastIndex}`);
    targetInput?.focus();
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setCountdown(60);
    setError(null);
    setOtp(['', '', '', '', '', '']);
  };

  const formatPhoneNumber = (phone: string) => {
    if (phone.length > 10) {
      return phone.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2-$3');
    }
    return phone;
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#6B73FF] to-[#4E6BDF] p-6 relative">
              <button
                onClick={onHide}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="flex items-center justify-center mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white text-center mb-2">
                Verify Your Phone
              </h2>
              <p className="text-white/90 text-sm text-center">
                We've sent a 6-digit code to
              </p>
              <p className="text-white font-semibold text-center mt-1">
                {formatPhoneNumber(phoneNumber)}
              </p>
            </div>

            {/* Body */}
            <div className="p-8">
              <form onSubmit={handleVerify}>
                {/* OTP Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 text-center mb-4">
                    Enter Verification Code
                  </label>
                  
                  <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-[#4E6BDF] focus:ring-4 focus:ring-[#4E6BDF]/20 outline-none transition-all"
                        disabled={isVerifying}
                      />
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2"
                  >
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                  </motion.div>
                )}

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={isVerifying || otp.some(digit => !digit)}
                  className="w-full h-12 bg-gradient-to-r from-[#6B73FF] to-[#4E6BDF] hover:from-[#5A64F5] hover:to-[#3D51D3] text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isVerifying ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Verify Code
                    </>
                  )}
                </button>

                {/* Resend Code */}
                <div className="text-center mt-4">
                  {!canResend ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Resend code in {countdown}s</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-sm font-semibold text-[#4E6BDF] hover:text-[#3D51D3] transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Resend Code
                    </button>
                  )}
                </div>
              </form>

              {/* Security Info */}
              <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <p className="text-xs text-blue-600">
                  Your phone number is secure and will not be shared
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OTPModal;
