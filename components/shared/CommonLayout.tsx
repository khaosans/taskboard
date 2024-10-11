import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';
import TopBar from '@/components/navigation/TopBar';
import NotificationSimulator from '@/components/ui/NotificationSimulator';
import { useWallet } from '@/contexts/WalletContext'; // Ensure this path is correct

interface CommonLayoutProps {
  children: ReactNode;
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  const { wallet, setWallet } = useWallet();

  const handleWalletChange = (newWallet: { address: string; type: string } | null) => {
    setWallet(newWallet);
  };

  return (
    <ThemeProvider>
      <RobotTransformerWallpaper />
      <TopBar />
      <main className="main-content dark:bg-gray-900 dark:text-white">
        {children}
        <NotificationSimulator />
      </main>
    </ThemeProvider>
  );
};

export default CommonLayout;