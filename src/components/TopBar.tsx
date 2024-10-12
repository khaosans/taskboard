'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Settings, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ChatbotModal from './ChatbotModal';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Web3SignIn from './Web3SignIn';
import { motion } from 'framer-motion';
import { useNotifications } from '@/hooks/useNotifications';

interface TopBarProps {
  onWalletChange: (wallet: { address: string; type: string } | null) => void;
  selectedWallet: { address: string; type: string } | null;
}

const TopBar: React.FC<TopBarProps> = ({ onWalletChange, selectedWallet }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNudged, setIsNudged] = useState(false);
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleLogoClick = () => {
    setIsNudged(true);
    globalThis.setTimeout(() => setIsNudged(false), 300);
  };

  const handleWalletChange = (wallet: { address: string; type: string } | null) => {
    onWalletChange(wallet);
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
        <Link href="/" className={`text-2xl font-bold hover:text-purple-400 transition-colors ${isNudged ? 'animate-nudge' : ''}`} onClick={handleLogoClick}>
          <motion.span 
            className="glow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Quantum Labs
          </motion.span>
        </Link>
        <nav className="flex space-x-4">
          <SignedIn>
            <motion.div className="flex space-x-4">
              {['Members', 'Task Manager', 'Agent Manager', 'Portfolio'].map((item, index) => (
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
            <Web3SignIn onWalletChange={handleWalletChange} />
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative hover:bg-gray-700 p-2 rounded transition-colors glow-button" 
              onClick={toggleChat}
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