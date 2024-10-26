'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/global.css'; // Ensure this path is correct
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';
import TopBar from '@/components/TopBar';
import useWallet from "@/hooks/useWallet";

// Import the useWallet hook


function getLibrary(provider: any): Web3Provider {
  return new Web3Provider(provider);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
//use wallet hook
    const { wallet } = useWallet();


  return (
    <html lang="en">
      <ClerkProvider>
        <body>{children}</body>
      </ClerkProvider>
    </html>
  );
}
