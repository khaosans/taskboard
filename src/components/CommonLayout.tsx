import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';
import TopBar from '@/components/TopBar';
import { useWallet } from '@/contexts/WalletContext';

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
      <TopBar onWalletChange={handleWalletChange} selectedWallet={wallet} />
      <main className="main-content dark:bg-gray-900 dark:text-white">
        {children}
      </main>
    </ThemeProvider>
  );
};

export default CommonLayout;