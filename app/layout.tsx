'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/global.css';
import { Toaster } from 'react-hot-toast';
import TopBar from 'components/TopBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <TopBar selectedWallet={null} />
            <main className="flex-grow">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
