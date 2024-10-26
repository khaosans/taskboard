'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import logger from '@/lib/logger';
import useWallet from '@/hooks/useWallet';
import Spinner from '@/components/Spinner';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { PortfolioData, ProtocolData } from 'types';

export default function PortfolioPageClient() {
  const { wallet } = useWallet(); // Assuming useWallet provides wallet state
  const [mounted, setMounted] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chainLoading, setChainLoading] = useState<string | null>(null);
  const [protocols, setProtocols] = useState<ProtocolData[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (wallet && mounted) {
        try {
          const response = await fetch(`/api/debank/user/total_balance?id=${wallet.address}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

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

    fetchPortfolioData();
  }, [wallet, mounted]);

  const fetchProtocolData = async (chainId: string) => {
    setChainLoading(chainId);
    if (wallet && mounted) {
      try {
        const response = await fetch(`/api/debank/user/protocols?id=${wallet.address}&chain_id=${chainId}`, {
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
    }
  };

  // ... (keep the rest of the component logic and JSX)
}
