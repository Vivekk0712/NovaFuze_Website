import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseClient';
import { sessionLogin } from '../services/authApi';
import { toast } from 'sonner';
import novaFuzeLogo from '../assets/b8120387b6ec249e0e1c5e71a9f6e337f9f42039.png';

// Detect if user is on mobile device
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 768);
};

const LoginPage = () => {
  // Check if we're on signup page based on hash
  const getInitialMode = () => {
    const hash = window.location.hash;
    return hash === '#signup' ? true : false;
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(getInitialMode());

  // Listen for hash changes to update mode
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#signup') {
        setIsSignUp(true);
      } else if (hash === '#login') {
        setIsSignUp(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle redirect result on component mount (for mobile Google sign-in)
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const idToken = await result.user.getIdToken();
          await sessionLogin(idToken);
          toast.success('Welcome!');
          window.location.href = window.location.origin;
        }
      } catch (error: any) {
        console.error('Redirect sign in error:', error);
        if (error.code !== 'auth/popup-closed-by-user') {
          toast.error('Failed to sign in with Google');
        }
      }
    };

    handleRedirectResult();
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();
      await sessionLogin(idToken);
      
      toast.success('Welcome!');
      // Redirect to home and reload to update auth state
      window.location.href = window.location.origin;
    } catch (error: any) {
      console.error('Google sign in error:', error);
      if (error.code !== 'auth/popup-closed-by-user') {
        toast.error('Failed to sign in with Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      let userCredential;
      
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Account created successfully!');
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        toast.success('Welcome back!');
      }
      
      const idToken = await userCredential.user.getIdToken();
      await sessionLogin(idToken);
      
      // Redirect to home and reload to update auth state
      window.location.href = window.location.origin;
    } catch (error: any) {
      console.error('Auth error:', error);
      
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already in use. Try signing in instead.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password');
      } else if (error.code === 'auth/user-not-found') {
        toast.error('No account found. Try signing up instead.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else {
        toast.error(error.message || 'Authentication failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6B73FF] via-[#4E6BDF] to-[#3D51D3] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
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
              {isSignUp ? 'Create Your Account.' : 'Sign In To Your Account.'}
            </h1>
            <p className="text-white/90 text-sm relative z-10">
              {isSignUp 
                ? "Let's create your account and get started." 
                : "Let's sign in to your account and get started."}
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleAuth} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="elementary221b@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: '2.75rem' }}
                    className="h-12 rounded-xl border-gray-200 focus:border-[#4E6BDF] focus:ring-[#4E6BDF] transition-all"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: '2.75rem', paddingRight: '2.75rem' }}
                    className="h-12 rounded-xl border-gray-200 focus:border-[#4E6BDF] focus:ring-[#4E6BDF] transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-[#6B73FF] to-[#4E6BDF] hover:from-[#5A64F5] hover:to-[#3D51D3] text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </span>
                ) : (
                  <>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              </span>
              <button
                onClick={() => {
                  const newMode = !isSignUp;
                  setIsSignUp(newMode);
                  window.location.hash = newMode ? '#signup' : '#login';
                }}
                className="text-sm font-semibold text-[#4E6BDF] hover:text-[#3D51D3] transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>

            {/* Forgot Password */}
            {!isSignUp && (
              <div className="text-center mt-2">
                <button
                  onClick={() => toast.info('Password reset feature coming soon!')}
                  className="text-sm font-medium text-[#4E6BDF] hover:text-[#3D51D3] transition-colors"
                >
                  Forgot Password
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-500 font-medium">OR</span>
              </div>
            </div>

            {/* Google Sign In */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50 transition-all font-medium"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign In With Google
            </Button>

            {/* Phone Auth Link */}
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Prefer phone? </span>
              <button
                onClick={() => window.location.hash = '#login-phone'}
                className="text-sm font-semibold text-[#4E6BDF] hover:text-[#3D51D3] transition-colors"
              >
                Sign in with Phone Number
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

export default LoginPage;
