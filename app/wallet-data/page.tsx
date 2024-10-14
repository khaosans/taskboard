'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/Spinner';
import { ethers } from 'ethers';
import Link from 'next/link';
import { useWallet } from '@/contexts/WalletContext';

interface BalanceData {
    balance: string;
    usdValue: number;
}

const WalletDataPage = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const { wallet } = useWallet();
    const [balance, setBalance] = useState<BalanceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (!isLoaded || !isSignedIn || !wallet) {
                setLoading(false);
                return;
            }

            try {
                const provider = new ethers.providers.InfuraProvider('optimism', process.env.NEXT_PUBLIC_INFURA_API_KEY);

                // Fetch balance for Optimism
                const balanceWei = await provider.getBalance(wallet.address);

                // Fetch ETH price in USD
                const ethPriceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
                if (!ethPriceResponse.ok) {
                    throw new Error(`HTTP error! status: ${ethPriceResponse.status}`);
                }
                const ethPriceData = await ethPriceResponse.json();
                const ethPrice = ethPriceData.ethereum.usd;

                const balanceEth = ethers.utils.formatEther(balanceWei);
                const usdValue = parseFloat(balanceEth) * ethPrice;

                setBalance({
                    balance: balanceEth,
                    usdValue: usdValue,
                });
            } catch (err) {
                console.error('Error details:', err);
                setError(`Error fetching balance: ${(err as Error).message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, [isLoaded, isSignedIn, wallet]);

    if (!isLoaded || loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <Spinner size="large" color="#611BBD" />
                <p className="mt-4 text-xl">Loading...</p>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
                <h1 className="text-2xl font-bold mb-4">Please sign in to view your wallet data</h1>
                <Button onClick={() => window.location.href = '/sign-in'}>Sign In</Button>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 bg-gray-900 text-white">
                <h1 className="text-3xl font-bold mb-4">Error</h1>
                <div className="bg-red-900 border border-red-400 text-red-100 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
                <div className="mt-8">
                    <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-4">Wallet Data (Optimism)</h1>
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <h2 className="text-2xl font-semibold mb-2">Balance</h2>
                {balance ? (
                    <>
                        <p className="text-xl">{parseFloat(balance.balance).toFixed(4)} ETH</p>
                        <p className="text-lg">Value: ${balance.usdValue.toFixed(2)}</p>
                    </>
                ) : (
                    <p>No balance data available</p>
                )}
            </div>
            <div className="mt-8">
                <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default WalletDataPage;
