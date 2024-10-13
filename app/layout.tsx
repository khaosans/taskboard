'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import dynamic from 'next/dynamic';
import TopBar from '@/components/TopBar';

const WalletProvider = dynamic(() => import('@/contexts/WalletContext').then(mod => mod.WalletProvider), { ssr: false });
const SolanaWalletProvider = dynamic(() => import('@/components/SolanaWalletProvider'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <WalletProvider>
              <SolanaWalletProvider>
                <TopBar onWalletChange={() => {}} selectedWallet={null} /> {/* Pass appropriate props */}
                <main className="min-h-screen flex flex-col">
                  {children}
                </main>
              </SolanaWalletProvider>
            </WalletProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
