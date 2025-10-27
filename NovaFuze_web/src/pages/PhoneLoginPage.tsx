import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import novaFuzeLogo from '../assets/b8120387b6ec249e0e1c5e71a9f6e337f9f42039.png';
import PhoneAuth from '../components/auth/PhoneAuth';

const PhoneLoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6B73FF] via-[#4E6BDF] to-[#3D51D3] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => window.location.hash = '#login'}
          className="mb-4 text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Email Login
        </Button>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Logo and Gradient */}
          <div className="bg-gradient-to-br from-[#6B73FF] to-[#4E6BDF] p-8 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <img src={novaFuzeLogo} alt="NovaFuze" className="w-10 h-10" />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-2 relative z-10">
              Sign In With Phone
            </h1>
            <p className="text-white/90 text-sm relative z-10">
              Enter your phone number to receive a verification code.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <PhoneAuth />

            {/* Back to Email Link */}
            <div className="text-center mt-6">
              <span className="text-sm text-gray-600">Prefer email? </span>
              <button
                onClick={() => window.location.hash = '#login'}
                className="text-sm font-semibold text-[#4E6BDF] hover:text-[#3D51D3] transition-colors"
              >
                Sign in with Email
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-white/90 mt-6 px-4"
        >
          By signing in, you agree to our{' '}
          <a href="#legal/terms" className="text-white hover:underline font-medium">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#legal/privacy" className="text-white hover:underline font-medium">
            Privacy Policy
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PhoneLoginPage;
