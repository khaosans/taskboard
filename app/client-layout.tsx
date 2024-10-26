'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import Footer from "@/components/footer"
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper'
import TopBar from '@/components/TopBar'
import useWallet from '@/hooks/useWallet'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const { wallet } = useWallet()

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <TopBar 
        selectedWallet={wallet} onWalletChange={function (wallet: any): void {
          throw new Error('Function not implemented.')
        } }      />
      <main className="flex-grow pb-20 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
