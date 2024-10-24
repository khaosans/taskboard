'use client'

import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import Footer from "@/components/footer"
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper'
import TopBar from '@/components/TopBar'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <TopBar />
      <RobotTransformerWallpaper />
      <main className="flex-grow pb-20 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
