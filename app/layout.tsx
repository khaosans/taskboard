'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { WalletProvider } from '@/contexts/WalletContext';
import TopBar from '@/components/TopBar';
import { Toaster } from 'react-hot-toast';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <ClerkProvider>
                    <ThemeProvider attribute="class">
                        <WalletProvider>
                            <TopBar />
                            {children}
                            <Toaster />
                        </WalletProvider>
                    </ThemeProvider>
                </ClerkProvider>
            </body>
        </html>
    );
};

export default RootLayout;
