'use client'

import React from 'react'
import TopBar from '@/components/TopBar'
import Footer from '@/components/footer'
import ChatbotModal from '@/components/ChatbotModal'
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper'

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  function setShowChatbotModal(arg0: boolean): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar onWalletChange={() => {}} selectedWallet={null} />
      <RobotTransformerWallpaper />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ChatbotModal onClose={() => setShowChatbotModal(false)} />
    </div>
  )
}

export default ClientLayout
