/* eslint-disable no-console */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Settings, MessageCircle } from 'lucide-react';
import ChatbotModal from './ChatbotModal';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { getWalletTokenBalances, getWalletTransactions } from '@/utils/heliusApi';
import Web3SignIn from './Web3SignIn';
import { storeWalletData } from '@/utils/supabase';

const networks = [
  { name: 'Mainnet', value: WalletAdapterNetwork.Mainnet },
  { name: 'Devnet', value: WalletAdapterNetwork.Devnet },
  { name: 'Testnet', value: WalletAdapterNetwork.Testnet },
];

interface TopBarProps {
  onNetworkChange: (network: WalletAdapterNetwork) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onNetworkChange }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isNudged, setIsNudged] = useState(false);
    const { isLoaded, user } = useUser();
    const { publicKey, connected } = useWallet();
    const { connection } = useConnection();
    const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleLogoClick = () => {
        setIsNudged(true);
        globalThis.setTimeout(() => setIsNudged(false), 300);
    };

    const handleNetworkChange = (network: typeof networks[0]) => {
        setSelectedNetwork(network);
        onNetworkChange(network.value);
    };

    useEffect(() => {
        async function fetchAndStoreWalletData() {
            if (connected && publicKey && user) {
                try {
                    const balances = await getWalletTokenBalances(publicKey.toString());
                    const transactions = await getWalletTransactions(publicKey.toString(), 5);

                    // Store the data in Supabase
                    await storeWalletData({
                        userId: user.id,
                        walletAddress: publicKey.toString(),
                        nativeBalance: balances.nativeBalance,
                        tokenBalances: balances.tokens,
                        recentTransactions: transactions,
                        nftHoldings: [],
                        defiInteractions: [],
                        lastUpdated: new Date().toISOString(),
                    });

                    console.log('Connected to Solana wallet:', publicKey.toBase58());
                    console.log('Selected network:', selectedNetwork.name);
                } catch (error) {
                    console.error('Error fetching or storing wallet data:', error);
                }
            }
        }

        fetchAndStoreWalletData();
    }, [connected, publicKey, selectedNetwork, user]);

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
                            {['Portfolio', 'Defi-dashboard', 'Solana Wallet'].map((item, index) => (
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
                        <select
                            value={selectedNetwork.name}
                            onChange={(e) => handleNetworkChange(networks.find(n => n.name === e.target.value)!)}
                            className="bg-gray-700 text-white rounded-lg py-2 px-3"
                        >
                            {networks.map((network) => (
                                <option key={network.name} value={network.name}>
                                    {network.name}
                                </option>
                            ))}
                        </select>
                        <Web3SignIn />
                        <WalletMultiButton />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative hover:bg-gray-700 p-2 rounded transition-colors glow-button"
                            onClick={() => setIsChatOpen(true)}
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
                </div>
            </motion.header>
            <ChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </>
    );
}

export default TopBar;
