'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { WalletProvider } from '@/contexts/WalletContext';
import TopBar from '@/components/TopBar';
import { Toaster } from 'react-hot-toast';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const chains = [mainnet, polygon, optimism, arbitrum];

const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Quantum Labs',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains
});

const wagmiConfig = createConfig({
  chains,
  transports: Object.fromEntries(
    chains.map(chain => [chain.id, http()])
  ),
  connectors
});

// Create a client
const queryClient = new QueryClient();

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <ClerkProvider>
                        <WagmiConfig config={wagmiConfig}>
                            <QueryClientProvider client={queryClient}>
                                <RainbowKitProvider chains={chains}>
                                    <WalletProvider>
                                        <TopBar />
                                        {children}
                                        <Toaster />
                                    </WalletProvider>
                                </RainbowKitProvider>
                            </QueryClientProvider>
                        </WagmiConfig>
                    </ClerkProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
