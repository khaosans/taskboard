'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import ChatbotModal from './ChatbotModal';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  onWalletChange: (wallet: { address: string; type: string } | null) => void;
  selectedWallet: { address: string; type: string } | null;
}

const TopBar: React.FC<TopBarProps> = ({ onWalletChange, selectedWallet }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { notifications } = useNotifications();

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <header>
        <Link href="/">Home</Link>
        <Link href="/drive">Drive</Link>
        {isSignedIn && <UserButton afterSignOutUrl="/" />}
        {/* Other UI elements */}
      </header>
      {isChatOpen && <ChatbotModal onClose={() => setIsChatOpen(false)} />}
    </>
  );
};

export default TopBar;
