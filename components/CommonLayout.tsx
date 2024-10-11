import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';
import TopBar from '@/components/TopBar';

interface CommonLayoutProps {
  children: ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <RobotTransformerWallpaper />
      <TopBar />
      <main className="main-content">
        {children}
      </main>
    </ThemeProvider>
  );
};

export default CommonLayout;