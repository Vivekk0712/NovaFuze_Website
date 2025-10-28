import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Trash2,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { getHistory, sendMessage, clearChat } from '../services/authApi';

const APP_ID = import.meta.env.VITE_APP_ID || 'default-app';

interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

interface ChatBotProps {
  user: User | null;
}

const ChatBot = ({ user }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  const welcomeMessage = {
    role: 'assistant',
    content: "Hi! 👋 I'm Nova, your AI assistant. How can I help you today?",
    timestamp: new Date().toISOString()
  };

  // Load chat history from database when user logs in
  useEffect(() => {
    const loadChatHistory = async () => {
      if (user?.uid) {
        try {
          setLoading(true);
          const response = await getHistory();

          if (response.data && response.data.history && Array.isArray(response.data.history)) {
            const dbHistory = response.data.history;
            // Add welcome message if history is empty
            const historyWithWelcome = dbHistory.length === 0 ? [welcomeMessage] : dbHistory;
            setChatHistory(historyWithWelcome);

            const storageKey = `${APP_ID}_chatHistory_${user.uid}`;
            localStorage.setItem(storageKey, JSON.stringify(historyWithWelcome));
          } else {
            const storageKey = `${APP_ID}_chatHistory_${user.uid}`;
            const savedHistory = localStorage.getItem(storageKey);
            if (savedHistory) {
              const parsed = JSON.parse(savedHistory);
              setChatHistory(parsed.length === 0 ? [welcomeMessage] : parsed);
            } else {
              setChatHistory([welcomeMessage]);
            }
          }
        } catch (error) {
          console.error('Error loading chat history:', error);
          const storageKey = `${APP_ID}_chatHistory_${user.uid}`;
          const savedHistory = localStorage.getItem(storageKey);
          if (savedHistory) {
            const parsed = JSON.parse(savedHistory);
            setChatHistory(parsed.length === 0 ? [welcomeMessage] : parsed);
          } else {
            setChatHistory([welcomeMessage]);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    loadChatHistory();
  }, [user?.uid]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message, timestamp: new Date().toISOString() };
    const newChatHistory = [...chatHistory, userMessage];

    setChatHistory(newChatHistory);
    setMessage('');
    setLoading(true);

    try {
      const response = await sendMessage(message);
      const assistantMessage = {
        role: 'assistant',
        content: response.data.reply,
        timestamp: new Date().toISOString()
      };
      setChatHistory([...newChatHistory, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, something went wrong.',
        timestamp: new Date().toISOString()
      };
      setChatHistory([...newChatHistory, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    try {
      setLoading(true);
      await clearChat();
      setChatHistory([]);
      if (user?.uid) {
        const storageKey = `${APP_ID}_chatHistory_${user.uid}`;
        localStorage.removeItem(storageKey);
      }
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error clearing chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const quickActions = [
    { label: "Services", text: "What services do you offer?" },
    { label: "Pricing", text: "What are your prices?" },
    { label: "Contact", text: "How can I contact you?" },
    { label: "Portfolio", text: "Show me your portfolio" }
  ];

  return (
    <>
      {/* Main Chat Button */}
      <button
        onClick={() => {
          console.log('ChatBot button clicked!', isOpen);
          setIsOpen(!isOpen);
        }}
        className={`fixed bottom-6 right-6 rounded-full text-white shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer ${isOpen ? 'w-12 h-12' : 'w-14 h-14 hover:scale-110'
          } flex items-center justify-center`}
        style={{
          zIndex: 9999,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          opacity: 1
        }}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </>
        )}
      </button>

      {/* Chat Interface */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6"
            style={{ zIndex: 9998, width: '360px', maxWidth: '90vw' }}
          >
            <div className="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden" style={{ height: '540px' }}>
              {/* Chat Header */}
              <div className="text-white rounded-t-xl p-4 flex items-center justify-between flex-shrink-0" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', opacity: 1 }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base flex items-center gap-2">
                      Nova AI
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">✨</span>
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-white/90">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    className="h-8 w-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
                    title="Clear chat"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
                    title="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {chatHistory.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#6B73FF] to-[#4E6BDF] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bot className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      Hi! 👋 I'm Nova, your AI assistant.
                    </p>
                    <p className="text-gray-500 text-xs">
                      Ask me anything about NovaFuze-Tech!
                    </p>
                  </div>
                )}

                {chatHistory.map((chat, index) => (
                  <div
                    key={`${chat.timestamp || index}-${index}`}
                    className={`flex gap-2 ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {chat.role === 'assistant' && (
                      <div className="w-8 h-8 bg-gradient-to-br from-[#6B73FF] to-[#4E6BDF] rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${chat.role === 'user'
                        ? 'bg-[#4E6BDF] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                        }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">
                        {chat.content}
                      </p>
                      <span className={`mt-0.5 block opacity-40 ${chat.role === 'user' ? 'text-white' : 'text-gray-500'}`} style={{ fontSize: '7px' }}>
                        {formatTime(chat.timestamp)}
                      </span>
                    </div>

                    {chat.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#6B73FF] to-[#4E6BDF] rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#4E6BDF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-[#4E6BDF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-[#4E6BDF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {chatHistory.length === 0 && !loading && (
                <div className="px-4 pb-2 flex-shrink-0 bg-gray-50">
                  <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => setMessage(action.text)}
                        className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-full hover:bg-[#4E6BDF] hover:text-white hover:border-[#4E6BDF] transition-colors"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t bg-white rounded-b-2xl flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 h-10 px-4 text-sm border border-gray-200 rounded-xl focus:border-[#4E6BDF] focus:ring-2 focus:ring-[#4E6BDF]/20 outline-none transition-all"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={!message.trim() || loading}
                    className="h-10 w-10 bg-gradient-to-r from-[#6B73FF] to-[#4E6BDF] hover:from-[#5A64F5] hover:to-[#3D51D3] text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                {/* Contact Options */}
                <div className="flex items-center justify-center gap-2 pt-2 border-t">
                  <button
                    onClick={() => window.open('tel:+918074678571', '_self')}
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#4E6BDF] transition-colors px-2 py-1"
                  >
                    <Phone className="h-3 w-3" />
                    <span className="hidden sm:inline">Call</span>
                  </button>
                  <button
                    onClick={() => window.open('mailto:support@novafuze.in', '_self')}
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#4E6BDF] transition-colors px-2 py-1"
                  >
                    <Mail className="h-3 w-3" />
                    <span className="hidden sm:inline">Email</span>
                  </button>
                  <button
                    onClick={() => window.open('https://wa.me/918074678571', '_blank')}
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-[#4E6BDF] transition-colors px-2 py-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {showDeleteDialog && (
          <div className="fixed inset-0 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 10000 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold mb-2">Clear Chat History?</h3>
              <p className="text-sm text-gray-600 mb-6">
                This will delete all messages in your current chat with Nova AI. This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteDialog(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearChat}
                  className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Clear Chat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
