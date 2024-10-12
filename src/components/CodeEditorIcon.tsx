'use client';

import React from 'react';
import { Code } from 'lucide-react';
import { useTheme } from '../app/contexts/ThemeContext';

interface CodeEditorIconProps {
  onClick: () => void;
}

const CodeEditorIcon: React.FC<CodeEditorIconProps> = ({ onClick }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`fixed bottom-16 right-16 p-3 rounded-full cursor-pointer transition-colors duration-200 shadow-lg ${
        theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'
      }`}
      onClick={onClick}
    >
      <Code className="w-6 h-6 text-white" />
    </div>
  );
};

export default CodeEditorIcon;