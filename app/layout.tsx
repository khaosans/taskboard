'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import '@/styles/global.css';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';
import TopBar from 'components/TopBar';
import { Inter } from 'next/font/google'

interface Wallet {
  address: string;
  type: string;
}

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Task Flow',
  description: 'Manage your tasks efficiently',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [selectedWallet, setSelectedWallet] = React.useState<Wallet | null>(null);

  const handleWalletChange = (wallet: Wallet | null) => {
    setSelectedWallet(wallet);
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
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
