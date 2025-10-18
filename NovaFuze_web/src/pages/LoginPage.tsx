import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import EmailAuth from '../components/auth/EmailAuth';
import GoogleSignIn from '../components/auth/GoogleSignIn';
import PhoneAuth from '../components/auth/PhoneAuth';
import novaFuzeLogo from '../assets/b8120387b6ec249e0e1c5e71a9f6e337f9f42039.png';
import { auth } from '../firebaseClient';
import { Shield, Zap, Users, Star } from 'lucide-react';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('email');
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    { icon: Shield, text: "Secure & Private", color: "#10b981" },
    { icon: Zap, text: "Lightning Fast", color: "#f59e0b" },
    { icon: Users, text: "Team Collaboration", color: "#6366f1" },
    { icon: Star, text: "Premium Features", color: "#8b5cf6" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'radial-gradient(1000px 600px at 20% 10%, rgba(99,102,241,0.35), transparent), radial-gradient(900px 500px at 80% 20%, rgba(147,51,234,0.35), transparent), linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      padding: '28px'
    }}>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full"
          style={{
            background: 'linear-gradient(45deg, rgba(99,102,241,0.1), rgba(147,51,234,0.1))',
            filter: 'blur(40px)'
          }}
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full"
          style={{
            background: 'linear-gradient(45deg, rgba(6,182,212,0.1), rgba(168,85,247,0.1))',
            filter: 'blur(30px)'
          }}
        />
      </div>

      <div className="flex items-center justify-center w-full max-w-6xl mx-auto">
        {/* Left Side - Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex flex-col justify-center w-1/2 pr-12"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">
              Welcome to the
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Future
              </span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Experience next-generation technology with NovaFuze-Tech. 
              Join thousands of users who trust our platform.
            </p>
          </motion.div>

          {/* Animated Features */}
          <motion.div variants={itemVariants} className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-4 p-4 rounded-2xl"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)'
                }}
              >
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: features[currentFeature].color + '20' }}
                >
                  {React.createElement(features[currentFeature].icon, {
                    size: 24,
                    style: { color: features[currentFeature].color }
                  })}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {features[currentFeature].text}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {currentFeature === 0 && "Your data is protected with enterprise-grade security"}
                    {currentFeature === 1 && "Optimized performance for seamless experience"}
                    {currentFeature === 2 && "Work together with your team in real-time"}
                    {currentFeature === 3 && "Access advanced features and priority support"}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Feature Indicators */}
            <div className="flex space-x-2 justify-center mt-6">
              {features.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full cursor-pointer"
                  style={{
                    backgroundColor: index === currentFeature ? '#ffffff' : 'rgba(255,255,255,0.3)'
                  }}
                  onClick={() => setCurrentFeature(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 max-w-md"
        >
          <motion.div variants={itemVariants}>
            <Card className="shadow-2xl border border-primary/20" style={{ 
              borderRadius: 24, 
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)'
            }}>
              <div style={{
                height: 6,
                background: 'linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)'
              }} />
              <CardHeader className="text-center space-y-1 pb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 200, 
                    damping: 15,
                    delay: 0.2
                  }}
                >
                  <div className="relative">
                    <img 
                      src={novaFuzeLogo} 
                      alt="NovaFuze-Tech Logo" 
                      className="mx-auto mb-3" 
                      style={{ width: 64, height: 64 }} 
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-transparent"
                      style={{
                        background: 'linear-gradient(45deg, #6366f1, #a855f7) border-box',
                        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'subtract'
                      }}
                    />
                  </div>
                </motion.div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
                  Welcome to NovaFuze-Tech
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Sign in to access our platform
                </CardDescription>
                {!auth && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2 p-2 rounded-lg text-xs"
                    style={{ 
                      backgroundColor: '#fef3c7',
                      color: '#d97706',
                      border: '1px solid #fbbf24'
                    }}
                  >
                    ⚠️ Authentication not configured. Set Firebase env vars to enable sign-in.
                  </motion.div>
                )}
              </CardHeader>
              <CardContent className="pt-3 px-6 pb-6">
                <Tabs value={activeTab} onValueChange={(k: string) => setActiveTab(k || 'email')} className="w-full">
                  <TabsList className="grid grid-cols-2 rounded-xl p-1 mb-6" style={{ 
                    background: 'rgba(99,102,241,0.10)',
                    border: '1px solid rgba(99,102,241,0.2)'
                  }}>
                    <TabsTrigger 
                      value="email" 
                      className="rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-fuchsia-500 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                    >
                      Email
                    </TabsTrigger>
                    <TabsTrigger 
                      value="phone" 
                      className="rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-fuchsia-500 data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
                    >
                      Phone
                    </TabsTrigger>
                  </TabsList>
                  
                  <AnimatePresence mode="wait">
                    <TabsContent value="email" className="pt-0">
                      <motion.div
                        key="email"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <EmailAuth />
                      </motion.div>
                    </TabsContent>
                    <TabsContent value="phone" className="pt-0">
                      <motion.div
                        key="phone"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PhoneAuth />
                      </motion.div>
                    </TabsContent>
                  </AnimatePresence>
                </Tabs>
                
                <div className="text-center mt-6">
                  <div className="relative my-6">
                    <hr style={{ border: '1px solid rgba(0,0,0,0.1)' }} />
                    <span 
                      className="absolute left-1/2 -translate-x-1/2 px-4 text-xs text-muted-foreground"
                      style={{ 
                        top: '-10px',
                        backgroundColor: 'rgba(255,255,255,0.95)'
                      }}
                    >
                      OR
                    </span>
                  </div>
                  <GoogleSignIn />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
