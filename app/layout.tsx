'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import '@/styles/global.css';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';
import TopBar from 'components/TopBar';
import RobotTransformerWallpaper from 'components/RobotTransformerWallpaper';
import { useWallet } from '@/hooks/useWallet';

function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { wallet } = useWallet();

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Web3ReactProvider getLibrary={getLibrary}>
              <Toaster />
              <TopBar 
              />
              {children}
            </Web3ReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
