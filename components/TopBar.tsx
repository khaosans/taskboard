'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Settings, MessageCircle, Briefcase, BarChart2, Users, Activity, Clipboard } from 'lucide-react';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Web3SignIn from './Web3SignIn';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useChatbotModal } from '@/hooks/useChatbotModal';
import ChatbotModal from '@/components/ChatbotModal';

const TopBar: React.FC = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { isChatbotModalOpen, openChatbotModal, closeChatbotModal } = useChatbotModal();

  if (!isLoaded) {
    return null;
  }

  const navItems = [
    { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
    { name: 'DeFi Dashboard', href: '/defi-dashboard', icon: BarChart2 },

  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex items-center justify-between p-4 bg-gray-800 text-white ${theme}`}
      >
        <Link href="/" className="text-2xl font-bold hover:text-purple-400 transition-colors">
          Quantum Labs
        </Link>
        <nav className="flex space-x-4">
          <SignedIn>
            <motion.div className="flex space-x-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  {React.createElement(item.icon, { className: "h-5 w-5" })}
                  <Link href={item.href} className="hover:text-purple-400 transition-colors">
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </SignedIn>
        </nav>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Web3SignIn />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative hover:bg-gray-700 p-2 rounded transition-colors glow-button"
              onClick={openChatbotModal}
            >
              <MessageCircle className="h-5 w-5" />
            </motion.button>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/settings" className="relative hover:bg-gray-700 p-2 rounded flex items-center transition-colors glow-button">
                <Settings className="h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href="/notifications" className="relative hover:bg-gray-700 p-2 rounded transition-colors glow-button">
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
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
      </motion.header>
      {isChatbotModalOpen && <ChatbotModal onClose={closeChatbotModal} />}
    </>
  );
}

export default TopBar;
