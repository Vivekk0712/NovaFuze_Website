import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import EmailAuth from '../components/auth/EmailAuth';
import GoogleSignIn from '../components/auth/GoogleSignIn';
import PhoneAuth from '../components/auth/PhoneAuth';
import novaFuzeLogo from '../assets/b8120387b6ec249e0e1c5e71a9f6e337f9f42039.png';
import { auth } from '../firebaseClient';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('email');

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
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <motion.div variants={itemVariants}>
          <Card className="shadow-2xl border border-primary/20" style={{ borderRadius: 18, overflow: 'hidden' }}>
            <div style={{
              height: 6,
              background: 'linear-gradient(90deg, #6366f1, #a855f7, #06b6d4)'
            }} />
            <CardHeader className="text-center space-y-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              >
                <img src={novaFuzeLogo} alt="NovaFuze-Tech Logo" className="mx-auto mb-3" style={{ width: 60, height: 60 }} />
              </motion.div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">Welcome to NovaFuze-Tech</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">Sign in to access our platform</CardDescription>
              {!auth && (
                <div className="mt-2 text-xs text-yellow-600">
                  Authentication not configured. Set Firebase env vars to enable sign-in.
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-3">
              <Tabs value={activeTab} onValueChange={(k) => setActiveTab(k || 'email')} className="w-full">
                <TabsList className="grid grid-cols-2 rounded-xl p-1" style={{ background: 'rgba(99,102,241,0.10)' }}>
                  <TabsTrigger value="email" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-fuchsia-500 data-[state=active]:text-primary-foreground">Email</TabsTrigger>
                  <TabsTrigger value="phone" className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-fuchsia-500 data-[state=active]:text-primary-foreground">Phone</TabsTrigger>
                </TabsList>
                <TabsContent value="email" className="pt-4">
                  <EmailAuth />
                </TabsContent>
                <TabsContent value="phone" className="pt-4">
                  <PhoneAuth />
                </TabsContent>
              </Tabs>
              <div className="text-center mt-6">
                <div className="relative my-5">
                  <hr className="border-border" />
                  <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-xs text-muted-foreground">
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
  );
};

export default LoginPage;
