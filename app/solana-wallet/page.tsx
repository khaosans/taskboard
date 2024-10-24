'use client'

import React from 'react'
import SolanaWalletView from '@/components/SolanaWalletView'

const SolanaWalletPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mt-8 mb-6">Solana Wallet</h1>
      <SolanaWalletView />
    </div>
  )
}

export default SolanaWalletPage
