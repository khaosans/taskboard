'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Settings, MessageCircle } from 'lucide-react';
import ChatbotModal from './ChatbotModal';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

const TopBar: React.FC = () => {
  const { account, activate, active, deactivate } = useWeb3React();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [ethBalance, setEthBalance] = useState<string>('0');
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const [isNudged, setIsNudged] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const connectWallet = async () => {
    if (isConnecting) return;
    setIsConnecting(true);
    try {
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        await activate(injected);
        toast.success('Wallet connected successfully');
      } else {
        toast.error('Please install MetaMask or Rabby');
      }
    } catch (error: any) {
      if (error.code === -32002) {
        toast.error('Connection request already in progress. Please check your wallet.');
      } else {
        toast.error(error.message || "Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      deactivate();
      setEthBalance('0');
      toast.success('Wallet disconnected successfully');
    } catch (error) {
      toast.error('Failed to disconnect wallet');
    }
  };

  const handleLogoClick = () => {
    setIsNudged(true);
    setTimeout(() => setIsNudged(false), 300); // Reset nudged state after animation
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <Link href="/" className={`text-2xl font-bold hover:text-purple-400 transition-colors ${isNudged ? 'animate-nudge' : ''}`} onClick={handleLogoClick}>
          <span className="glow">Quantum Labs</span>
        </Link>
        <nav className="flex space-x-4">
          <SignedIn>
            <Link href="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</Link>
            <Link href="/members" className="hover:text-purple-400 transition-colors">Members</Link>
            <Link href="/task-manager" className="hover:text-purple-400 transition-colors">Task Manager</Link>
            <Link href="/agent-manager" className="hover:text-purple-400 transition-colors">Agent Manager</Link>
          </SignedIn>
        </nav>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <button className="hover:bg-gray-700 p-2 rounded transition-colors" onClick={toggleChat}>
              <MessageCircle className="h-5 w-5" />
            </button>
            <Link href="/settings" className="hover:bg-gray-700 p-2 rounded flex items-center transition-colors">
              <Settings className="h-5 w-5" />
            </Link>
            <Link href="/notifications" className="hover:bg-gray-700 p-2 rounded transition-colors">
              <Bell className="h-5 w-5" />
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/login" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Sign In
            </Link>
          </SignedOut>
        </div>
      </header>
      {isChatOpen && <ChatbotModal onClose={() => setIsChatOpen(false)} />}
    </>
  );
}

export default TopBar;