'use client';

import React, { useEffect, useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { fetchTopChains, fetchEthereumBalance } from '@/utils/fetchChainData'; // Import the utility functions
import { setKV, getKV } from '@/utils/vercelKV'; // Import Vercel KV functions

const DeFiBalance: React.FC = () => {
    const { wallet } = useWallet();
    const [chains, setChains] = useState<{ id: string; name: string; current_price: number }[]>([]); // Specify type for chains
    const [ethBalance, setEthBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Check if top chains are cached in Vercel KV
                const cachedChains = await getKV('topChains');
                if (cachedChains) {
                    setChains(cachedChains);
                } else {
                    // Fetch top chains from CoinGecko
                    const topChains = await fetchTopChains();
                    setChains(topChains);
                    // Cache the top chains in Vercel KV
                    await setKV('topChains', topChains);
                }

                // Fetch Ethereum balance if wallet is available
                if (wallet) {
                    const balanceInWei = await fetchEthereumBalance(wallet.address);
                    setEthBalance(parseFloat(balanceInWei) / 1e18); // Convert Wei to Ether
                }
            } catch (err: unknown) { // Specify the type of err as unknown
                if (err instanceof Error) {
                    setError(err.message); // Safely access message property
                } else {
                    setError('An unknown error occurred'); // Fallback for unknown error types
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [wallet]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Wallet Balance</h2>
            <p>{ethBalance !== null ? `Balance: ${ethBalance.toFixed(4)} ETH` : 'No balance available'}</p>
            <h2>Top 10 Chains</h2>
            <ul>
                {chains.map((chain) => (
                    <li key={chain.id}>
                        {chain.name}: ${chain.current_price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeFiBalance;