'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import { WalletProvider } from '@/contexts/WalletContext';
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { SolanaWalletProvider } from '@/components/SolanaWalletProvider';
import { createClient } from '@supabase/supabase-js';
import { ethers } from 'ethers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();
  
  const supabaseClient = React.useMemo(() => {
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${getToken({ template: 'supabase' })}`,
        },
      },
    });
  }, [getToken]);

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}

function getLibrary(provider: any) {
    return new ethers.providers.Web3Provider(provider);
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: '#611BBD',
          },
          elements: {
            formButtonPrimary: {
              fontSize: '16px',
              textTransform: 'none',
              backgroundColor: '#611BBD',
              '&:hover': {
                backgroundColor: '#49247A',
              },
            },
            card: {
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
            },
            modalContent: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
            },
            modalContentInner: {
              width: '100%',
              maxWidth: '400px',
            },
          },
          layout: {
            socialButtonsPlacement: 'bottom',
            socialButtonsVariant: 'iconButton',
          },
        }}>
            <html lang="en">
                <body>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <Web3ReactProvider getLibrary={getLibrary}>
                            <WalletProvider>
                                <SolanaWalletProvider>
                                    <SupabaseProvider>
                                        <Layout>
                                            {children}
                                            <Toaster />
                                        </Layout>
                                    </SupabaseProvider>
                                </SolanaWalletProvider>
                            </WalletProvider>
                        </Web3ReactProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
