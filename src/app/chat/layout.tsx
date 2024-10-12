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
    <html lang="en">
      <body>
        <ThemeProvider>
          <RobotTransformerWallpaper />
          <div className="relative z-10">
            {children}
          
            <ChatbotModal onClose={() => setIsChatbotOpen(false)} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ChatLayout;
