import React from 'react';
import ChatBot from './ChatBot';

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
  // Simply render ChatBot - it handles its own toggle button and UI
  return <ChatBot user={user} />;
};

export default MCPToggle;
