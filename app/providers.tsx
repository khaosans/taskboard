'use client';

import { SolanaWalletProvider } from '@/components/SolanaWalletProvider';
import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
      <ClerkProvider>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </ClerkProvider>
  );
};

export default Providers;
