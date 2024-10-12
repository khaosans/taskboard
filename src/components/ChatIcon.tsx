'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTheme } from '../app/contexts/ThemeContext';

interface ChatIconProps {
  onClick: () => void;
}

const ChatIcon: React.FC<ChatIconProps> = ({ onClick }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`fixed bottom-16 right-4 p-3 rounded-full cursor-pointer transition-colors duration-200 shadow-lg ${
        theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
      }`}
      onClick={onClick}
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </div>
  );
};

export default ChatIcon;