'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import logger from '@/lib/logger';
import { toast } from 'react-hot-toast';
import { useWallet } from '@/contexts/WalletContext';
import Spinner from '@/components/Spinner';

interface ChainData {
  id: string;
  name: string;
  logo_url: string;
  usd_value: number;
}

interface PortfolioData {
  total_usd_value: number;
  chain_list: ChainData[];
}

export default function PortfolioPage() {
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { wallet } = useWallet();

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

          if (response.status === 404) {
            const errorText = await response.text();
            logger.error(`404 Error: ${errorText}`);
            throw new Error('API endpoint not found');
          }

          if (!response.ok) {
            const errorData = await response.json();
            logger.error(`Error Response Data: ${JSON.stringify(errorData)}`);
            throw new Error(`Network response was not ok: ${errorData.error}`);
          }

          const data: PortfolioData = await response.json();
          logger.info(`Response Data: ${JSON.stringify(data)}`);
          setPortfolioData(data);
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

  if (!isUserLoaded || loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Spinner size="large" color="#611BBD" />
        <p className="mt-4 text-xl">Loading...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your portfolio</h1>
        <Button onClick={() => router.push('/sign-in')}>Sign In</Button>
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

  if (loading) {
    return <div>Loading portfolio data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Portfolio</h1>
      <div className="flex items-center mb-4">
        <img src={user.imageUrl || '/default-profile.png'} alt={'User'} className="w-12 h-12 rounded-full mr-2" />
        <h2 className="text-xl font-semibold">{user.username}</h2>
      </div>
      <p className="mb-4">Connected Wallet: {wallet.address}</p>
      {portfolioData ? (
        <div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Portfolio Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">Total Balance: ${portfolioData.total_usd_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </CardContent>
          </Card>
          <h3 className="text-xl font-semibold mb-2">Chain Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioData.chain_list.map((chain) => (
              <Card key={chain.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <img src={chain.logo_url} alt={chain.name} className="w-6 h-6 mr-2" />
                    {chain.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>${chain.usd_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <p>No portfolio data available.</p>
      )}
    </div>
  );
}