'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import logger from '@/lib/logger';
import { useWallet } from '@/hooks/useWallet';
import Spinner from '@/components/Spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from 'next-themes';

interface ChainData {
  id: string;
  name: string;
  logo_url: string;
  usd_value: number;
}

interface ProtocolData {
  id: string;
  name: string;
  balance: number;
}

interface PortfolioData {
  total_usd_value: number;
  chain_list: ChainData[];
}

export default function PortfolioPage() {
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [selectedChain, setSelectedChain] = useState<ChainData | null>(null);
  const [protocols, setProtocols] = useState<ProtocolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [chainLoading, setChainLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { wallet } = useWallet();
  const { theme } = useTheme();

  useEffect(() => {
    if (isUserLoaded && isSignedIn && user && wallet) {
      logger.info(`Fetching balance for wallet: ${wallet.address}`);
      const fetchPortfolioData = async () => {
        try {
          const response = await fetch(`/api/debank/user/total_balance?id=${wallet.address}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          logger.info(`Response Status: ${response.status}`);

          if (!response.ok) {
            const errorData = await response.json();
            logger.error(`Error Response Data: ${JSON.stringify(errorData)}`);
            throw new Error(`Network response was not ok: ${errorData.error}`);
          }

          const data: PortfolioData = await response.json();
          logger.info(`Response Data: ${JSON.stringify(data)}`);
          setPortfolioData(data);
          setLastUpdated(new Date().toLocaleString());
        } catch (error) {
          logger.error(`Error fetching portfolio data: ${(error as Error).message}`);
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchPortfolioData();
    } else {
      setPortfolioData(null);
      setLoading(false);
    }
  }, [isUserLoaded, isSignedIn, user, wallet]);

  const fetchProtocolData = async (chainId: string) => {
    setChainLoading(chainId);
    try {
      const response = await fetch(`/api/debank/user/protocols?id=${wallet}&chain_id=${chainId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch protocol data');
      }

      const data: ProtocolData[] = await response.json();
      setProtocols(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setChainLoading(null);
    }
  };

  const handleChainClick = (chain: ChainData) => {
    setSelectedChain(chain);
    fetchProtocolData(chain.id);
  };

  if (!isUserLoaded || loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[200px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your portfolio</h1>
        <Button onClick={() => window.location.href = '/sign-in'}>Sign In</Button>
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">No wallet connected</h1>
        <p>Please connect a wallet to view your portfolio.</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={`container mx-auto p-4 bg-background text-foreground ${theme}`}>
      <h1 className="text-3xl font-bold mb-4">Your Portfolio</h1>
      <div className="flex items-center mb-4">
        <img src={user.imageUrl || '/default-profile.png'} alt={'User'} className="w-12 h-12 rounded-full mr-2" />
        <h2 className="text-xl font-semibold">{user.username}</h2>
      </div>
      <p className="mb-4">Connected Wallet: {wallet.address}</p>
      <p className="mb-4">Time Frame: Last 24 hours</p>
      <p className="mb-8">Last Updated: {lastUpdated}</p>
      {portfolioData ? (
        <div>
          <Card className="mb-4 bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>Portfolio Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">Total Balance: ${portfolioData.total_usd_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </CardContent>
          </Card>
          <h3 className="text-xl font-semibold mb-2">Chain Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioData.chain_list
              .filter(chain => chain.usd_value > 0)
              .map((chain) => (
                <Card key={chain.id} className="cursor-pointer bg-gray-800 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <img src={chain.logo_url} alt={chain.name} className="w-6 h-6 mr-2" />
                      {chain.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {chainLoading === chain.id ? (
                      <Spinner />
                    ) : (
                      <p>${chain.usd_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
          </div>
          {selectedChain && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Protocols on {selectedChain.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {protocols.map((protocol) => (
                  <Card key={protocol.id} className="bg-gray-800 text-white">
                    <CardHeader>
                      <CardTitle>{protocol.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Balance: ${protocol.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
