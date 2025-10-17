import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ 
  show, 
  message = 'Success!' 
}) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-2xl p-8 shadow-2xl text-center"
        style={{ minWidth: '250px' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 200, 
            damping: 10,
            delay: 0.2 
          }}
          className="mb-4 flex justify-center"
        >
          <div
            className="rounded-full p-3"
            style={{ backgroundColor: '#dcfce7' }}
          >
            <CheckCircle size={32} style={{ color: '#16a34a' }} />
          </div>
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-bold text-gray-900 mb-2"
        >
          {message}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600"
        >
          Redirecting you now...
        </motion.p>

        {/* Animated dots */}
        <motion.div
          className="flex justify-center space-x-1 mt-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#6366f1' }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessAnimation;