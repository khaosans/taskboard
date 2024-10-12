'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
}

const CryptoPriceGraph: React.FC = () => {
    const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentTokenIndex, setCurrentTokenIndex] = useState(0);
    const [view, setView] = useState<'price' | 'change'>('price'); // Current price or price change

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
        const tokenChangeInterval = setInterval(() => {
            setCurrentTokenIndex(prevIndex => (prevIndex + 1) % cryptoData.length);
        }, 10000); // Change token every 10 seconds

        return () => clearInterval(tokenChangeInterval);
    }, [cryptoData]);

    useEffect(() => {
        const viewChangeInterval = setInterval(() => {
            setView(prev => (prev === 'price' ? 'change' : 'price'));
        }, 10000); // Change view every 10 seconds

        return () => clearInterval(viewChangeInterval);
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner component
    }

    // Ensure currentToken is defined
    const currentToken = cryptoData[currentTokenIndex];

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">
                Current {view === 'price' ? 'Price' : 'Price Change'} of {currentToken ? currentToken.name : 'Loading...'}
            </h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={[{ name: currentToken?.name || 'N/A', value: view === 'price' ? currentToken?.current_price : currentToken?.price_change_percentage_24h }]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke={view === 'price' ? "#10B981" : "#EF4444"} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CryptoPriceGraph;