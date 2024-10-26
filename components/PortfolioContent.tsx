'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import logger from '@/lib/logger';
import useWallet from '@/hooks/useWallet';
import Spinner from '@/components/Spinner';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

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

export default function PortfolioContent() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [selectedChain, setSelectedChain] = useState<ChainData | null>(null);
  const [protocols, setProtocols] = useState<ProtocolData[]>([]);
  const [loading, setLoading] = useState(true);
  const [chainLoading, setChainLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const { wallet } = useWallet();
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (wallet && mounted) {
        try {
          const response = await fetch(`/api/debank/user/total_balance?id=${wallet.address}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Network response was not ok: ${errorData.error}`);
          }
          const data: PortfolioData = await response.json();
          setPortfolioData(data);
          setLastUpdated(new Date().toLocaleString());
        } catch (error) {
          logger.error(`Error fetching portfolio data: ${(error as Error).message}`);
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      } else {
        setPortfolioData(null);
        setLoading(false);
      }
    };

    if (mounted) {
      fetchPortfolioData();
    }
  }, [wallet, mounted]);

  const fetchProtocolData = async (chainId: string) => {
    setChainLoading(chainId);
    if (wallet && mounted) {
      try {
        const response = await fetch(`/api/debank/user/protocols?id=${wallet?.address}&chain_id=${chainId}`);
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
    }
  };

  const handleChainClick = (chain: ChainData) => {
    setSelectedChain(chain);
    fetchProtocolData(chain.id);
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return <Spinner />;
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
                <div key={chain.id} className="cursor-pointer bg-gray-800 text-white" onClick={() => handleChainClick(chain)}>
                  <Card>
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
                </div>
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
