import React from 'react';
import { motion } from 'framer-motion';

interface PasswordStrengthProps {
  password: string;
  show: boolean;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, show }) => {
  const getStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password)
    };

    Object.values(checks).forEach(check => {
      if (check) score++;
    });

    return { score, checks };
  };

  const { score, checks } = getStrength(password);
  
  const getStrengthText = (score: number) => {
    if (score <= 1) return { text: 'Very Weak', color: '#ef4444' };
    if (score <= 2) return { text: 'Weak', color: '#f97316' };
    if (score <= 3) return { text: 'Fair', color: '#eab308' };
    if (score <= 4) return { text: 'Good', color: '#22c55e' };
    return { text: 'Strong', color: '#16a34a' };
  };

  const strength = getStrengthText(score);

  if (!show || !password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-2 p-3 rounded-lg"
      style={{ 
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0'
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-600">Password Strength</span>
        <span 
          className="text-xs font-semibold"
          style={{ color: strength.color }}
        >
          {strength.text}
        </span>
      </div>
      
      {/* Strength Bar */}
      <div className="flex space-x-1 mb-3">
        {[1, 2, 3, 4, 5].map((level) => (
          <motion.div
            key={level}
            className="h-1 flex-1 rounded-full"
            style={{
              backgroundColor: score >= level ? strength.color : '#e2e8f0'
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: level * 0.1 }}
          />
        ))}
      </div>

      {/* Requirements */}
      <div className="space-y-1">
        {[
          { key: 'length', text: 'At least 8 characters' },
          { key: 'lowercase', text: 'One lowercase letter' },
          { key: 'uppercase', text: 'One uppercase letter' },
          { key: 'numbers', text: 'One number' },
          { key: 'symbols', text: 'One special character' }
        ].map((requirement) => (
          <div key={requirement.key} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: checks[requirement.key as keyof typeof checks] ? '#22c55e' : '#e2e8f0'
              }}
            >
              {checks[requirement.key as keyof typeof checks] && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path
                    d="M7 1L3 5L1 3"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span 
              className="text-xs"
              style={{
                color: checks[requirement.key as keyof typeof checks] ? '#22c55e' : '#64748b'
              }}
            >
              {requirement.text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PasswordStrength;