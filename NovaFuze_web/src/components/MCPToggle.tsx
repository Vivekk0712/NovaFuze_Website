import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageCircle, X, ChevronUp, ChevronDown } from 'lucide-react';
import ChatBot from './ChatBot';
import { AnimatePresence, motion } from 'framer-motion';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

interface MCPToggleProps {
  user: User | null;
}

const MCPToggle = ({ user }: MCPToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleToggle = () => {
    if (!user) {
      // Not logged in - redirect to login
      window.location.hash = '#login';
      return;
    }
    // Logged in - toggle chat
    setIsOpen((v) => !v);
  };

  return (
    <>
      {/* MCP Toggle Button - Always visible */}
      <div className="fixed bottom-24 right-6" style={{ zIndex: 9999, pointerEvents: 'auto' }}>
        <Button
          onClick={handleToggle}
          className="w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 relative"
          size="sm"
          style={{ backgroundColor: '#7c3aed', color: '#ffffff', opacity: 1 }}
          title={user ? "Open AI Assistant" : "Sign in to use AI Assistant"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
          {/* Lock indicator when not logged in */}
          {!user && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              🔒
            </div>
          )}
        </Button>
      </div>

      {/* MCP Chat Panel - Only show when logged in and open */}
      <AnimatePresence>
        {isOpen && user && (
          <motion.div
            className="fixed right-6"
            style={{
              bottom: 120,
              zIndex: 9998,
              pointerEvents: 'auto',
              width: 380,
              maxWidth: '92vw',
              maxHeight: '80vh',
              background: '#ffffff',
              border: '1px solid rgba(124,58,237,0.25)',
              borderRadius: 12,
              boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
              overflow: 'auto'
            }}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between" style={{ padding: '10px 12px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <CardTitle className="text-lg" style={{ color: '#5b21b6' }}>AI Assistant</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
                  {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {!isMinimized && (
              <div style={{ padding: 10 }}>
                <ChatBot user={user} onToggleFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MCPToggle;
