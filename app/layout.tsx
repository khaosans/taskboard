'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/global.css';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';
import TopBar from '@/components/TopBar';
import useWallet from "@/hooks/useWallet";
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

function getLibrary(provider: any): Web3Provider {
    return new Web3Provider(provider);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { wallet } = useWallet();

    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const wallets = [new PhantomWalletAdapter()];

    return (
        <html lang="en">
        <ClerkProvider>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <body>{children}</body>
                </WalletProvider>
            </ConnectionProvider>
        </ClerkProvider>
        </html>
    );
}
