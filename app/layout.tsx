import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import '@/styles/global.css';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';
import AuthWalletBar from '@/components/AuthWalletBar';

interface Wallet {
  address: string;
  type: string;
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedWallet, setSelectedWallet] = React.useState<Wallet | null>(null);

  const handleWalletChange = (wallet: Wallet | null) => {
    setSelectedWallet(wallet);
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Web3ReactProvider getLibrary={(provider: any) => new Web3Provider(provider)}>
              <Toaster />
              <AuthWalletBar onWalletChange={handleWalletChange} selectedWallet={selectedWallet} />
              {children}
            </Web3ReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
