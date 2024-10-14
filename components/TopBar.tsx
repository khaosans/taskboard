'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Settings, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ChatbotModal from './ChatbotModal';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNotifications } from '@/hooks/useNotifications';
import { useWallet } from '@/contexts/WalletContext';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const TopBar: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  const { wallet } = useWallet();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between p-4 bg-gray-800 text-white"
      >
        <Link href="/" className="text-2xl font-bold hover:text-purple-400 transition-colors">
          Quantum Labs
        </Link>
        <nav className="flex space-x-4">
          <SignedIn>
            <motion.div className="flex space-x-4">
              {['Portfolio', 'Swap'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-purple-400 transition-colors">
                    {item}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </SignedIn>
        </nav>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <ConnectButton />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative hover:bg-gray-700 p-2 rounded transition-colors" 
              onClick={toggleChat}
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
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 px-2 py-1 text-xs">
                    {unreadCount}
                  </Badge>
                )}
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
      {isChatOpen && <ChatbotModal onClose={() => setIsChatOpen(false)} />}
    </>
  );
}

export default TopBar;
