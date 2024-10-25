'use client'

import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper'

interface ClientLayoutProps {
  children: React.ReactNode
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <RobotTransformerWallpaper />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  )
}

export default ClientLayout
