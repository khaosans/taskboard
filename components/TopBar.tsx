'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Settings, MessageCircle } from 'lucide-react';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useChatbotModal } from '@/hooks/useChatbotModal';
import ChatbotModal from '@/components/ChatbotModal';

const TopBar: React.FC = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { theme } = useTheme();
  const { isChatbotModalOpen, openChatbotModal, closeChatbotModal } = useChatbotModal();

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-md text-white ${theme}`}
      >
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.05, 1],
              textShadow: [
                '0 0 5px rgba(255,255,255,0.5)',
                '0 0 20px rgba(255,255,255,0.8)',
                '0 0 5px rgba(255,255,255,0.5)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-2xl font-bold quantum-labs-logo"
          >
            Quantum Labs
          </motion.div>
        </Link>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative hover:bg-gray-700 p-2 rounded transition-colors"
              onClick={openChatbotModal}
            >
              <MessageCircle className="h-5 w-5" />
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/settings" className="relative hover:bg-gray-700 p-2 rounded flex items-center transition-colors">
                <Settings className="h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/notifications" className="relative hover:bg-gray-700 p-2 rounded transition-colors">
                <Bell className="h-5 w-5" />
              </Link>
            </motion.div>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/login" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
                Sign In
              </Link>
            </motion.div>
          </SignedOut>
        </div>
      </motion.header>
      {isChatbotModalOpen && <ChatbotModal onClose={closeChatbotModal} />}
    </>
  );
}

export default TopBar;
