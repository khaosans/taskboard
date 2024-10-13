'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useWallet } from '@/contexts/WalletContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, DollarSign, Briefcase, TrendingUp, Globe, PieChart, Wallet } from 'lucide-react';
import Spinner from '@/components/Spinner';
import { ethers } from 'ethers';
import vercelKVClient from '@/utils/vercelKV';

interface Asset {
  name: string;
  symbol: string;
  value: number;
  balance: string;
  chain: string;
  percentage: number;
}

interface ChainDistribution {
  name: string;
  value: number;
  percentage: number;
}

interface PortfolioSummary {
  totalValue: number;
  assets: Asset[];
  chainDistribution: ChainDistribution[];
}

interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

interface GlobalData {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_change_percentage_24h_usd: number;
}

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;

const chains = [
  { name: 'Ethereum', rpcUrl: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`, symbol: 'ETH' },
  { name: 'Optimism', rpcUrl: `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`, symbol: 'ETH' },
  { name: 'Arbitrum', rpcUrl: `https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`, symbol: 'ETH' },
  { name: 'Polygon', rpcUrl: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`, symbol: 'MATIC' },
];

const DashboardPage: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { wallet } = useWallet();
  const [loading, setLoading] = useState(true);
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary | null>(null);
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !wallet?.address) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const cacheKey = `dashboard_${wallet.address}`;
        const cachedData = await vercelKVClient.get(cacheKey);

        if (cachedData) {
          setPortfolioSummary(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        // Fetch token prices from CoinGecko
        const priceResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,optimism,arbitrum,matic-network&vs_currencies=usd');
        const priceData = await priceResponse.json();

        let totalValue = 0;
        const assets: Asset[] = [];
        const chainValues: { [key: string]: number } = {};

        for (const chain of chains) {
          try {
            const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
            const balance = await provider.getBalance(wallet.address);
            const ethBalance = parseFloat(ethers.utils.formatEther(balance));
            const price = priceData[chain.name.toLowerCase()]?.usd || 0;
            const value = ethBalance * price;

            totalValue += value;
            chainValues[chain.name] = value;

            assets.push({
              name: chain.name,
              symbol: chain.symbol,
              value: value,
              balance: ethBalance.toFixed(4),
              chain: chain.name,
              percentage: 0
            });
          } catch (error) {
            console.error(`Error fetching balance for ${chain.name}:`, error);
          }
        }

        assets.forEach(asset => {
          asset.percentage = (asset.value / totalValue) * 100;
        });

        const chainDistribution = Object.entries(chainValues).map(([name, value]) => ({
          name,
          value,
          percentage: (value / totalValue) * 100
        })).sort((a, b) => b.value - a.value);

        const portfolioSummary = {
          totalValue,
          assets,
          chainDistribution
        };

        setPortfolioSummary(portfolioSummary);

        // Cache the data for 5 minutes
        await vercelKVClient.set(cacheKey, JSON.stringify(portfolioSummary), { ex: 300 });

        // Fetch trending coins and global data
        // ... (keep existing trending coins and global data fetching)

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoaded, isSignedIn, wallet]);

  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="large" color="#611BBD" />
      </div>
    );
  }

  if (!isSignedIn || !wallet?.address) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p>Please sign in and connect your wallet to view your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="mr-2" />
              Connected Wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium truncate">
              {wallet?.address}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2" />
              Your Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${portfolioSummary?.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2" />
              Your Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {portfolioSummary?.assets.map((asset, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  <span>{asset.name} ({asset.symbol})</span>
                  <div className="text-right">
                    <span>{asset.balance} {asset.symbol}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      (${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2" />
              Chain Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {portfolioSummary?.chainDistribution.map((chain, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  <span>{chain.name}</span>
                  <div className="text-right">
                    <span>${chain.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span className="ml-2 text-sm text-gray-500">({chain.percentage.toFixed(2)}%)</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2" />
              Trending Coins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {trendingCoins.map((coin) => (
                <li key={coin.id} className="flex items-center mb-2">
                  <img src={coin.thumb} alt={coin.name} className="w-6 h-6 mr-2" />
                  <span>{coin.name} ({coin.symbol})</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2" />
              Global Market Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            {globalData && (
              <>
                <p>Total Market Cap: ${globalData.total_market_cap.usd.toLocaleString()}</p>
                <p>24h Volume: ${globalData.total_volume.usd.toLocaleString()}</p>
                <p>24h Change: {globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Link href="/portfolio">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            View Full Portfolio <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
