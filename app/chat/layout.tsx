'use client';

import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import ChatbotModal from '@/components/ChatbotModal';

import '../../styles/global.css';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);

  return (
    <html lang="en" className={theme}>
      <body>
        <RobotTransformerWallpaper />
        <div className="chat-layout">
          <button onClick={() => setIsChatbotModalOpen(true)}>Open Chatbot</button>
          {children}
          {isChatbotModalOpen && (
            <ChatbotModal isOpen={isChatbotModalOpen} onClose={() => setIsChatbotModalOpen(false)}/>
          )}
        </div>
      </body>
    </html>
  );
};

export default ChatLayout;
