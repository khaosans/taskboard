'use client'

import React, { useMemo, useEffect, useState } from 'react'
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from 'next-themes'
import Spinner from '@/components/Spinner'

// Import styles directly
import '@solana/wallet-adapter-react-ui/styles.css'

function WalletBalance() {
  const { publicKey } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [defiValue, setDefiValue] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    if (!publicKey) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/solana-wallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ publicKey: publicKey.toString() }),
        })

        if (!response.ok) {
          throw new Error('Failed to fetch wallet data')
        }

        const data = await response.json()
        setBalance(data.balance)
        setDefiValue(data.defiValue)
        setError(null)

        // Store data in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('solanaWalletData', JSON.stringify({
            balance: data.balance,
            defiValue: data.defiValue,
            lastUpdated: new Date().toISOString()
          }))
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching wallet data:', err.message)
          setError('Failed to fetch wallet data. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [publicKey])

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('solanaWalletData')
      if (storedData) {
        const { balance, defiValue } = JSON.parse(storedData)
        setBalance(balance)
        setDefiValue(defiValue)
      }
    }
  }, [])

  if (loading) return <div className="text-cyan-100"><Spinner /> Loading wallet data...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (balance === null) return <div className="text-cyan-100">No balance data available.</div>

  return (
    <Card className={`bg-${theme === 'dark' ? 'blue-900/40' : 'white'} text-${theme === 'dark' ? 'cyan-100' : 'gray-800'}`}>
      <CardHeader>
        <CardTitle>Wallet Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Balance: {balance.toFixed(4)} SOL</p>
        {defiValue && <p>Estimated DeFi Value: {defiValue.toFixed(4)} SOL</p>}
      </CardContent>
    </Card>
  )
}

export default function SolanaWalletPage() {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])
  const { theme } = useTheme()

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Layout>
            <div className="relative min-h-screen">
              <div className={`relative z-10 min-h-screen bg-gradient-to-b ${theme === 'dark' ? 'from-blue-900/5 to-purple-900/5' : 'from-gray-100 to-gray-200'} text-${theme === 'dark' ? 'white' : 'gray-800'} font-sans`}>
                <div className="container mx-auto px-4 py-8">
                  <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500' : 'text-blue-600'}`}>Solana Wallet Connection</h1>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Card className={`${theme === 'dark' ? 'bg-blue-900/40 text-cyan-100' : 'bg-white text-gray-800'} w-full max-w-md`}>
                      <CardHeader>
                        <CardTitle>Connect Your Wallet</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">Click the button below to connect your Phantom wallet</p>
                        <WalletMultiButton className={`${theme === 'dark' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded w-full`} />
                      </CardContent>
                    </Card>
                    <WalletBalance />
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
