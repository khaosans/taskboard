'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Settings, MessageCircle, Home, BarChart2, Briefcase, Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ChatbotModal from './ChatbotModal';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Web3SignIn from './Web3SignIn';
import { motion } from 'framer-motion';
import { useNotifications } from '@/hooks/useNotifications';
import { createClerkSupabaseClient } from 'lib/supabase';

interface TopBarProps {
    onWalletChange?: (wallet: { address: string; type: string } | null) => void;
    selectedWallet?: { address: string; type: string } | null;
}

const TopBar: React.FC<TopBarProps> = ({ onWalletChange, selectedWallet }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isNudged, setIsNudged] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser();

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleLogoClick = () => {
        setIsNudged(true);
        globalThis.setTimeout(() => setIsNudged(false), 300);
    };

    const handleWalletChange = (wallet: { address: string; type: string } | null) => {
        if (onWalletChange) {
            onWalletChange(wallet);
        }
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
                            <IconLink href="/" icon={Home} tooltip="Home" />
                            <IconLink href="/portfolio" icon={Briefcase} tooltip="Portfolio" />
                            <IconLink href="/defi-dashboard" icon={BarChart2} tooltip="DeFi Dashboard" />
                            <IconLink href="/solana-wallet" icon={Wallet} tooltip="Solana Wallet" />
                        </motion.div>
                    </SignedIn>
                </nav>
                <div className="flex items-center space-x-4">
                    <SignedIn>
                        <Web3SignIn />
                        <IconButton icon={MessageCircle} onClick={toggleChat} tooltip="Chat" />
                        <IconLink href="/settings" icon={Settings} tooltip="Settings" />
                        <IconLink href="/notifications" icon={Bell} tooltip="Notifications" />
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

const IconLink: React.FC<{ href: string; icon: React.ElementType; tooltip: string }> = ({ href, icon: Icon, tooltip }) => (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link href={href} className="relative hover:bg-gray-700 p-2 rounded flex items-center transition-colors glow-button" title={tooltip}>
            <Icon className="h-5 w-5" />
        </Link>
    </motion.div>
);

const IconButton: React.FC<{ icon: React.ElementType; onClick: () => void; tooltip: string }> = ({ icon: Icon, onClick, tooltip }) => (
    <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative hover:bg-gray-700 p-2 rounded transition-colors glow-button"
        onClick={onClick}
        title={tooltip}
    >
        <Icon className="h-5 w-5" />
    </motion.button>
);

export default TopBar;
