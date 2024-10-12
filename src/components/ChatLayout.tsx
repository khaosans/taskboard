'use client';

import React, { useState } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import '@/styles/globals.css';
import ChatbotModal from '@/components/ChatbotModal';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <ThemeProvider>
      <RobotTransformerWallpaper />
      <div className="relative z-10 min-h-screen">
        {children}
        
        <ChatbotModal onClose={() => setIsChatbotOpen(false)} />
      </div>
    </ThemeProvider>
  );
};

export default ChatLayout;