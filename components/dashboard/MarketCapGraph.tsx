'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CryptoData {
    id: string;
    name: string;
    market_cap: number;
    price_change_percentage_24h: number;
}

const quotes = [
    "Success is not the key to happiness. Happiness is the key to success.",
    "The only way to do great work is to love what you do.",
    "Don't watch the clock; do what it does. Keep going.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Opportunities don't happen. You create them.",
];

const MarketCapGraph: React.FC = () => {
    const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [randomQuote, setRandomQuote] = useState('');

    const fetchCryptoData = async () => {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 50,
                    page: 1,
                    sparkline: false,
                },
            });
            setCryptoData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCryptoData();
        const interval = setInterval(fetchCryptoData, 60000); // Refresh every minute
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Set a random quote on component mount
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        setRandomQuote(quote);
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner component
    }

    // Calculate top 25% market cap
    const top25Percent = Math.ceil(cryptoData.length * 0.25);
    const topCryptos = cryptoData.slice(0, top25Percent);

    const pieData = topCryptos.map(crypto => ({
        name: crypto.name,
        value: crypto.market_cap,
    }));

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Market Cap Distribution (Top 25%)</h2>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#10B981', '#3B82F6', '#EF4444', '#FBBF24', '#A78BFA'][index % 5]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold">Quote of the Moment:</h3>
                <p className="italic">{randomQuote}</p>
            </div>
        </div>
    );
};

export default MarketCapGraph;