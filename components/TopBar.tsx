'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Web3SignIn from './Web3SignIn';
import { motion } from 'framer-motion';

const TopBar: React.FC = () => {
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
