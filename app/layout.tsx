'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import '@/styles/global.css';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';
import TopBar from 'components/TopBar';

interface Wallet {
  address: string;
  type: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [selectedWallet, setSelectedWallet] = React.useState<Wallet | null>(null);

  const handleWalletChange = (wallet: Wallet | null) => {
    setSelectedWallet(wallet);
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
              <Toaster />
              <TopBar onWalletChange={handleWalletChange} selectedWallet={selectedWallet} />
              {children}
            </Web3ReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
