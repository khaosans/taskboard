'use client'

import React, { useEffect, useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import Spinner from '@/components/Spinner'
import { useTheme } from 'next-themes'

interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
}

export default function CryptoDashboard() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        setCoins(data);
        setLastUpdated(new Date().toLocaleString());
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${theme}`}>
      <h1 className="text-3xl font-bold text-center mb-2">Crypto Dashboard</h1>
      <p className="text-center mb-8 text-muted-foreground">Top 20 cryptocurrencies by market cap</p>
      <p className="text-center mb-4">Time Frame: Last 24 hours</p>
      <p className="text-center mb-8">Last Updated: {lastUpdated}</p>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-900">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Coin</th>
              <th className="py-3 px-4 text-right">Price</th>
              <th className="py-3 px-4 text-right">24h Change</th>
              <th className="py-3 px-4 text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={coin.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 flex items-center">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                  <span className="font-medium">{coin.name}</span>
                  <span className="text-muted-foreground ml-2 hidden sm:inline">{coin.symbol.toUpperCase()}</span>
                </td>
                <td className="py-3 px-4 text-right">${coin.current_price.toLocaleString()}</td>
                <td className={`py-3 px-4 text-right ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <div className="flex items-center justify-end">
                    {coin.price_change_percentage_24h > 0 ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </td>
                <td className="py-3 px-4 text-right">${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
