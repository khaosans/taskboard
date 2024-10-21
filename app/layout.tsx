'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
<<<<<<< HEAD
import '@/styles/global.css';
=======
import '@globals.css';
>>>>>>> 37faa74 (chore: Update global styles and imports)
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';
import TopBar from 'components/TopBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
<<<<<<< HEAD
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
=======
          <ThemeProvider attribute="class" defaultTheme="dark">
>>>>>>> 37faa74 (chore: Update global styles and imports)
            <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
              <Toaster />
              <TopBar onWalletChange={() => {}} selectedWallet={null} />
              {children}
            </Web3ReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
