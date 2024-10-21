'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/hooks/useTheme';
import TopBar from '@/components/TopBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ClerkProvider>
      <html lang="en" className={theme}>
        <body>
          <ThemeProvider attribute="class">
            <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
              <Toaster />
              <TopBar />
              {children}
            </Web3ReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
