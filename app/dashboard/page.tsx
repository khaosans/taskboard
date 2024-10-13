'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useWallet } from '@/contexts/WalletContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Activity, DollarSign, Briefcase, TrendingUp, Globe, PieChart } from 'lucide-react';
import Spinner from '@/components/Spinner';

interface Asset {
  name: string;
  symbol: string;
  value: number;
  logo: string;
  percentage: number;
}

interface ChainDistribution {
  name: string;
  value: number;
  percentage: number;
}

interface PortfolioSummary {
  totalValue: number;
  topAssets: Asset[];
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

const DashboardPage = () => {
  const { user } = useUser();
  const { wallet } = useWallet();
  const [loading, setLoading] = useState(true);
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary | null>(null);
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoin[]>([]);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (wallet?.address) {
        try {
          // Fetch portfolio data from DeBank API
          const portfolioResponse = await fetch(`/api/debank/user/total_balance?id=${wallet.address}`);
          const portfolioData = await portfolioResponse.json();
          
          const totalValue = portfolioData.total_usd_value;
          
          // Process top assets
          const allAssets = portfolioData.chain_list.flatMap((chain: any) => chain.token_list || []);
          const sortedAssets = allAssets.sort((a: any, b: any) => b.amount * b.price - a.amount * a.price);
          const topAssets = sortedAssets.slice(0, 5).map((token: any) => {
            const value = token.amount * token.price;
            return {
              name: token.name,
              symbol: token.symbol,
              value: value,
              logo: token.logo_url,
              percentage: (value / totalValue) * 100
            };
          });

          // Process chain distribution
          const chainDistribution = portfolioData.chain_list.map((chain: any) => ({
            name: chain.name,
            value: chain.usd_value,
            percentage: (chain.usd_value / totalValue) * 100
          })).sort((a: ChainDistribution, b: ChainDistribution) => b.value - a.value);

          setPortfolioSummary({
            totalValue,
            topAssets,
            chainDistribution
          });

          // Fetch trending coins from CoinGecko
          const trendingResponse = await fetch('https://api.coingecko.com/api/v3/search/trending');
          const trendingData = await trendingResponse.json();
          setTrendingCoins(trendingData.coins.slice(0, 5).map((coin: any) => coin.item));

          // Fetch global data from CoinGecko
          const globalResponse = await fetch('https://api.coingecko.com/api/v3/global');
          const globalData = await globalResponse.json();
          setGlobalData(globalData.data);

        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [wallet]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="large" color="#611BBD" />
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
              Top Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {portfolioSummary?.topAssets.map((asset, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img src={asset.logo} alt={asset.name} className="w-6 h-6 mr-2" />
                    <span>{asset.name} ({asset.symbol})</span>
                  </div>
                  <div className="text-right">
                    <span>${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <span className="ml-2 text-sm text-gray-500">({asset.percentage.toFixed(2)}%)</span>
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
