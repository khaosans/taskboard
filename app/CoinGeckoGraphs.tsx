'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTheme } from './contexts/ThemeContext';

const API_URL = "https://api.coingecko.com/api/v3";
const COINS = ["bitcoin", "ethereum", "cardano", "solana", "polkadot", "ripple", "litecoin", "chainlink", "stellar", "uniswap", "dogecoin", "aave", "cosmos", "tezos", "vechain", "filecoin", "maker", "compound", "ftx-token", "theta-token"];

interface CoinData {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_percentage_24h: number;
    prices: [number, number][]; // Ensure prices is typed as an array of tuples
}

const CoinGeckoGraphs: React.FC = () => {
    const [coinData, setCoinData] = useState<CoinData[]>([]);
    const [currentCoinIndex, setCurrentCoinIndex] = useState(0);
    const { theme } = useTheme(); // Using theme for dynamic colors

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [marketData, historicalData] = await Promise.all([
                    fetch(`${API_URL}/coins/markets?vs_currency=usd&ids=${COINS.join(",")}`).then(res => res.json()),
                    Promise.all(COINS.map(coin => 
                        fetch(`${API_URL}/coins/${coin}/market_chart?vs_currency=usd&days=30&interval=daily`).then(res => res.json()) // Fetching 30 days of data
                    ))
                ]);

                const combinedData = marketData.map((coin: any, index: number) => ({
                    ...coin,
                    prices: historicalData[index].prices
                }));

                setCoinData(combinedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (coinData.length === 0) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    }

    // Rotate through the coins every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCoinIndex((prevIndex) => (prevIndex + 1) % coinData.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [coinData.length]);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-8">Crypto Market Overview</h1>
            <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                    <CardTitle>{coinData[currentCoinIndex]?.name} Price Chart</CardTitle>
                    <CardDescription className="text-gray-400">30-day price history in USD</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={coinData[currentCoinIndex]?.prices.map((priceData: [number, number]) => {
                            const [timestamp, price] = priceData; // Explicitly destructuring with type
                            return { date: timestamp, price };
                        })}>
                            <XAxis dataKey="date" tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()} />
                            <YAxis />
                            <Line type="monotone" dataKey="price" stroke={theme === 'dark' ? '#fff' : '#000'} strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <div className="mt-8">
                <h2 className="text-xl font-bold">Top Cryptocurrencies</h2>
                <ul>
                    {coinData.map((coin) => (
                        <li key={coin.id} className="flex justify-between">
                            <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                            <span>{coin.current_price.toFixed(2)} USD</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CoinGeckoGraphs;
