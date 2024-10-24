'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  getWalletTokenBalances,
  getEnrichedTransactions,
  getWalletNFTs,
  getTokenMetadata,
  getDeFiTransactions,
  getNameServiceDomains,
  getTokenTransfers,
  getNFTEvents
} from '@/utils/heliusApi';
import { LAMPORTS_PER_SOL, TokenAmount } from '@solana/web3.js';
import { useUser } from '@clerk/nextjs';
import { WalletData } from '@/utils/dataSchema';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface TokenBalance {
  mint: string;
  owner: string;
  amount: TokenAmount;
  uiTokenAmount: {
    amount: string;
    decimals: number;
  };
  metadata?: {
    name: string;
    symbol: string;
  };
  priceChange24h?: string;
  usdValue: number;
}

const SolanaWalletView: React.FC = () => {
    const { connected, publicKey } = useWallet();
    const { user } = useUser();
    const [walletData, setWalletData] = useState<WalletData | null>(null);
    const [nfts, setNfts] = useState<any[]>([]);
    const [defiTransactions, setDefiTransactions] = useState<any[]>([]);
    const [nameServiceDomains, setNameServiceDomains] = useState<string[]>([]);
    const [tokenTransfers, setTokenTransfers] = useState<any[]>([]);
    const [walletValueHistory, setWalletValueHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchWalletData() {
            if (connected && publicKey && user) {
                setIsLoading(true);
                try {
                    const address = publicKey.toString();
                    
                    const [
                        balances,
                        transactions,
                        fetchedNfts,
                        defiTxs,
                        domains,
                        transfers
                    ] = await Promise.all([
                        getWalletTokenBalances(address),
                        getEnrichedTransactions(address, 50),
                        getWalletNFTs(address),
                        getDeFiTransactions(address, 20),
                        getNameServiceDomains(address),
                        getTokenTransfers(address, 20)
                    ]);

                    const tokenMints = balances.tokens.map((token: any) => token.mint);
                    const metadata = await getTokenMetadata(tokenMints);

                    // Fetch NFT floor prices
                    const nftsWithFloorPrices = await Promise.all(fetchedNfts.map(async (nft: any) => {
                        const events = await getNFTEvents(nft.mint);
                        const floorPrice = events.find((event: any) => event.type === 'LIST')?.amount || 'N/A';
                        return { ...nft, floorPrice };
                    }));

                    setWalletData({
                        userId: user.id,
                        walletAddress: address,
                        nativeBalance: balances.nativeBalance,
                        tokenBalances: balances.tokens.map((token: TokenBalance, index: number) => ({
                            ...token,
                            symbol: metadata[index].symbol,
                            amount: parseFloat(token.uiTokenAmount.amount),
                            decimals: token.uiTokenAmount.decimals,
                            usdValue: metadata[index].usdValue,
                            priceChange24h: (Math.random() * 20 - 10).toFixed(2) // Mock data, replace with actual API call
                        })),
                        recentTransactions: transactions,
                        nftHoldings: nftsWithFloorPrices,
                        defiInteractions: defiTxs,
                        lastUpdated: new Date().toISOString(),
                    });
                    setNfts(nftsWithFloorPrices);
                    setDefiTransactions(defiTxs);
                    setNameServiceDomains(domains);
                    setTokenTransfers(transfers);

                    // Mock wallet value history data
                    setWalletValueHistory(Array.from({length: 30}, (_, i) => ({
                        date: new Date(Date.now() - (29-i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        value: Math.random() * 10000 + 5000
                    })));

                } catch (error) {
                    console.error('Error fetching wallet data:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        }

        fetchWalletData();
    }, [connected, publicKey, user]);

    if (!connected || !publicKey) {
        return <div className="text-center mt-8">Please connect your Solana wallet to view details.</div>;
    }

    if (isLoading) {
        return <div className="text-center mt-8">Loading wallet data...</div>;
    }

    return (
        <div className="mt-8 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Solana Wallet Details</h2>
            <p className="mb-4">Connected Address: {publicKey?.toString()}</p>
            
            {walletData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Balances</h3>
                        <p>SOL: {(walletData.nativeBalance / LAMPORTS_PER_SOL).toFixed(4)} SOL</p>
                        <ul className="mt-2">
                            {walletData.tokenBalances.map((token) => (
                                <li key={token.mint} className="mb-1">
                                    {token.metadata?.name || token.mint} ({token.metadata?.symbol}): {token.amount} (${token.usdValue.toFixed(2)})
                                    <span className={`ml-2 ${parseFloat(token.priceChange24h || '0') >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {token.priceChange24h}%
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Recent Transactions</h3>
                        <ul className="max-h-60 overflow-y-auto">
                            {walletData.recentTransactions.map((tx: any, index: number) => (
                                <li key={index} className="mb-2 border-b border-gray-600 pb-2">
                                    <p>Type: {tx.type}</p>
                                    <p>Status: {tx.status}</p>
                                    <p>Timestamp: {new Date(tx.timestamp * 1000).toLocaleString()}</p>
                                    <p>Fee: {tx.fee / LAMPORTS_PER_SOL} SOL</p>
                                    <p>Signature: {tx.signature.slice(0, 20)}...</p>
                                    {tx.tokenTransfers && tx.tokenTransfers.length > 0 && (
                                        <p>Token Transfers: {tx.tokenTransfers.map((tt: any) => `${tt.tokenAmount} ${tt.tokenSymbol}`).join(', ')}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">NFT Holdings</h3>
                        <ul className="max-h-60 overflow-y-auto">
                            {nfts.map((nft: any, index: number) => (
                                <li key={index} className="mb-2 flex items-center">
                                    {nft.image && <img src={nft.image} alt={nft.name} className="w-10 h-10 mr-2 rounded" />}
                                    <div>
                                        <p>{nft.name}</p>
                                        <p className="text-sm text-gray-400">Collection: {nft.collection?.name || 'N/A'}</p>
                                        <p className="text-sm text-gray-400">Floor Price: {nft.floorPrice} SOL</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">DeFi Activity</h3>
                        <ul className="max-h-60 overflow-y-auto">
                            {defiTransactions.map((tx: any, index: number) => (
                                <li key={index} className="mb-2 border-b border-gray-600 pb-2">
                                    <p>Type: {tx.type}</p>
                                    <p>Timestamp: {new Date(tx.timestamp * 1000).toLocaleString()}</p>
                                    <p>Protocol: {tx.protocol || 'Unknown'}</p>
                                    <p>Action: {tx.action || 'Swap'}</p>
                                    <p>Amount: {tx.amount} {tx.token}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {nameServiceDomains.length > 0 && (
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">Name Service Domains</h3>
                            <ul>
                                {nameServiceDomains.map((domain, index) => (
                                    <li key={index}>{domain}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="bg-gray-700 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Recent Token Transfers</h3>
                        <ul className="max-h-60 overflow-y-auto">
                            {tokenTransfers.map((transfer: any, index: number) => (
                                <li key={index} className="mb-2 border-b border-gray-600 pb-2">
                                    <p>{transfer.tokenAmount} {transfer.tokenSymbol}</p>
                                    <p className="text-sm">From: {transfer.fromAddress.slice(0, 4)}...{transfer.fromAddress.slice(-4)}</p>
                                    <p className="text-sm">To: {transfer.toAddress.slice(0, 4)}...{transfer.toAddress.slice(-4)}</p>
                                    <p className="text-sm">Date: {new Date(transfer.timestamp * 1000).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg col-span-2">
                        <h3 className="text-xl font-semibold mb-2">Wallet Statistics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p>Total Value: ${walletData.tokenBalances.reduce((sum, token) => sum + token.usdValue, 0).toFixed(2)}</p>
                                <p>Number of Tokens: {walletData.tokenBalances.length}</p>
                                <p>Number of NFTs: {nfts.length}</p>
                            </div>
                            <div>
                                <p>Total Transactions: {walletData.recentTransactions.length}</p>
                                <p>DeFi Interactions: {defiTransactions.length}</p>
                                <p>Last Updated: {new Date(walletData.lastUpdated).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg col-span-2">
                        <h3 className="text-xl font-semibold mb-2">Wallet Value Over Time</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={walletValueHistory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SolanaWalletView;
