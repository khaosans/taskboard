'use client';

import React from 'react';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '../ui/button'; // Updated import path to use relative path
import { motion } from 'framer-motion';

interface Wallet { // Added Wallet interface definition
  total_usd_value: number;
  address: string;
  type: string;
}

interface TopBarProps {
  onWalletChange: (wallet: Wallet | null) => void; // Updated type for wallet
  selectedWallet: Wallet | null; // Ensure Wallet type is defined
}

const TopBar: React.FC<TopBarProps> = ({ onWalletChange, selectedWallet }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return null;
  }

  const navItems = [
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'DeFi Dashboard', href: '/defi-dashboard' },
  ];

  return (
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
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="hover:text-purple-400 transition-colors">
                {item.name}
              </Link>
            ))}
          </motion.div>
        </SignedIn>
      </nav>
      <div className="flex items-center space-x-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="/login" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Sign In
          </Link>
        </SignedOut>
      </div>
    </motion.header>
  );
}

export default TopBar;
