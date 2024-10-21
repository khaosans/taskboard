'use client'

import React, { useEffect, useState } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import Spinner from '@/components/Spinner'
import { useTheme } from 'next-themes'
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper'

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
    <div className="relative min-h-screen overflow-hidden">
      <RobotTransformerWallpaper />
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-blue-900/5 to-purple-900/5 text-white font-sans">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Crypto Dashboard</h1>
          <p className="text-center mb-8 text-cyan-100">Top 20 cryptocurrencies by market cap</p>
          <p className="text-center mb-4 text-cyan-100">Time Frame: Last 24 hours</p>
          <p className="text-center mb-8 text-cyan-100">Last Updated: {lastUpdated}</p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-blue-900/40 rounded-lg shadow-md">
              <thead>
                <tr className="bg-blue-900/60">
                  <th className="py-3 px-4 text-left text-cyan-300">#</th>
                  <th className="py-3 px-4 text-left text-cyan-300">Coin</th>
                  <th className="py-3 px-4 text-right text-cyan-300">Price</th>
                  <th className="py-3 px-4 text-right text-cyan-300">24h Change</th>
                  <th className="py-3 px-4 text-right text-cyan-300">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin, index) => (
                  <tr key={coin.id} className="border-b border-blue-900/20 hover:bg-blue-900/20">
                    <td className="py-3 px-4 text-cyan-100">{index + 1}</td>
                    <td className="py-3 px-4 flex items-center">
                      <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                      <span className="font-medium text-cyan-100">{coin.name}</span>
                      <span className="text-cyan-300 ml-2 hidden sm:inline">{coin.symbol.toUpperCase()}</span>
                    </td>
                    <td className="py-3 px-4 text-right text-cyan-100">${coin.current_price.toLocaleString()}</td>
                    <td className={`py-3 px-4 text-right ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <div className="flex items-center justify-end">
                        {coin.price_change_percentage_24h > 0 ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-cyan-100">${coin.market_cap.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
