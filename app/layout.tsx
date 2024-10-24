'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import '@/styles/global.css';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';
import TopBar from '@/components/TopBar';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { createRateLimitedConnection } from '@/utils/rateLimit';

// Import Solana wallet styles
import '@solana/wallet-adapter-react-ui/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [network, setNetwork] = useState<WalletAdapterNetwork>(WalletAdapterNetwork.Mainnet);
  
  const endpoint = useMemo(() => process.env.NEXT_PUBLIC_HELIUS_RPC_HTTP || clusterApiUrl(network), [network]);
  
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
    [network]
  );

  const connection = createRateLimitedConnection(endpoint);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletModalProvider>
                    <Toaster />
                    <TopBar onNetworkChange={setNetwork} />
                    {children}
                  </WalletModalProvider>
                </WalletProvider>
              </ConnectionProvider>
            </Web3ReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
