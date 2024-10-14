'use client';

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useUser } from '@clerk/nextjs'; // Import Clerk's useUser hook
import Link from 'next/link'; // Import Link from Next.js
import vercelKVClient from 'utils/vercelKV'; // Import the Upstash Redis client

const WalletValue = () => {
    const { user } = useUser(); // Get the current user from Clerk
    const [balance, setBalance] = useState<string | null>(null);
    const walletAddress = user?.publicMetadata?.walletAddress; // Assuming wallet address is stored in publicMetadata

    useEffect(() => {
        const fetchBalance = async () => {
            if (typeof walletAddress !== 'string' || !walletAddress) return;

            // Check KV cache for balance
            const cachedBalance = await getCachedBalance(walletAddress);
            if (cachedBalance) {
                setBalance(cachedBalance);
            } else {
                // If not in cache, fetch new balance and cache it
                const newBalance = await fetchNewBalance(walletAddress);
                if (newBalance) {
                    setBalance(newBalance);
                    await cacheBalance(walletAddress, newBalance);
                }
            }
        };

        fetchBalance().catch(console.error);
    }, [walletAddress]); // Dependency on walletAddress

    // Function to get cached balance from KV
    const getCachedBalance = async (address: string): Promise<string | null> => {
        const cachedValue = await vercelKVClient.get(`balance:${address}`);
        return cachedValue as string | null; // Ensure the return type is string or null
    };

    // Function to cache the balance in KV
    const cacheBalance = async (address: string, balance: string) => {
        // Cache for 24 hours (86400 seconds)
        await vercelKVClient.set(`balance:${address}`, balance, { ex: 86400 });
    };

    const fetchNewBalance = async (address: string): Promise<string | null> => {
        // Implement your balance fetching logic here
        // This is a placeholder and should be replaced with actual balance fetching
        return "0.0";
    };

    return (
        <div>
            <nav style={{ padding: '10px', background: '#f0f0f0' }}>
                <Link href="/" style={{ marginRight: '15px' }}>Home</Link>
                <Link href="/wallet-value" style={{ marginRight: '15px' }}>Wallet Value</Link>
                <Link href="/wallet-data" style={{ marginRight: '15px' }}>Wallet Data</Link> {/* New link to Wallet Data page */}
            </nav>
            <h1>Wallet Value</h1>
            {balance !== null ? <p>Balance: {balance} ETH</p> : <p>Loading...</p>}
        </div>
    );
};

export default WalletValue;
