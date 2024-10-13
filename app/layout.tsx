'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import Layout from '@/components/Layout';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes';
import { WalletProvider } from '@/contexts/WalletContext';
import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { SolanaWalletProvider } from '@/components/SolanaWalletProvider';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
                <SessionContextProvider supabaseClient={supabase}>
                    <body>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                            <Web3ReactProvider getLibrary={(provider: any) => new Web3Provider(provider)}>
                                <WalletProvider>
                                    <SolanaWalletProvider>
                                        <Layout>
                                            {children}
                                            <Toaster />
                                        </Layout>
                                    </SolanaWalletProvider>
                                </WalletProvider>
                            </Web3ReactProvider>
                        </ThemeProvider>
                    </body>
                </SessionContextProvider>
            </html>
        </ClerkProvider>
    )
}
