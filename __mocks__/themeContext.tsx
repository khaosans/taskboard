import { jest } from '@jest/globals';
import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: jest.fn(),
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={{ theme: 'light', toggleTheme: jest.fn() }}>
    {children}
  </ThemeContext.Provider>
);
