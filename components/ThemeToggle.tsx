import React from 'react';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Toggle Theme (Current: {theme})
    </button>
  );
};

export default ThemeToggle;
