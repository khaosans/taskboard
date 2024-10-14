'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import logger from '@/lib/logger';
import { useWallet } from '@/contexts/WalletContext';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { Home, Wallet } from 'lucide-react'; // Import icons from lucide-react

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

  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center mb-4">
        <Link href="/" className="flex items-center">
          <Home className="h-6 w-6 text-gray-800 dark:text-white" />
        </Link>
        <Link href="/wallet-value" className="flex items-center">
          <Wallet className="h-6 w-6 text-gray-800 dark:text-white" />
        </Link>
      </nav>
      <h1 className="text-3xl font-bold mb-4">Your Portfolio</h1>
      <div className="flex items-center mb-4">
        {user ? (
          <>
            <img src={user.imageUrl || '/default-profile.png'} alt={'User'} className="w-12 h-12 rounded-full mr-2" />
            <h2 className="text-xl font-semibold">{user.username}</h2>
          </>
        ) : (
          <p>Please log in to see your profile.</p>
        )}
      </div>
      {wallet ? (
        <p className="mb-4">Connected Wallet: {wallet.address}</p>
      ) : (
        <p className="mb-4">No wallet connected.</p>
      )}
      {/* Render portfolio data here */}
    </div>
  );
}
