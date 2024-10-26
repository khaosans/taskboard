'use client';

import { ClerkProvider } from '@clerk/nextjs';
import React from 'react';
import { SolanaWalletProvider } from '@/components/SolanaWalletProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
      <ClerkProvider>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </ClerkProvider>
  );
};

export default Providers;
