'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import logger from '@/lib/logger';
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

interface ChainPortfolioData {
  total_usd_value: number;
  portfolio_item_list: Array<{
    id: string;
    chain: string;
    name: string;
    symbol: string;
    logo_url: string;
    amount: number;
    price: number;
    usd_value: number;
  }>;
}

interface Protocol {
  id: string;
  chain: string;
  name: string;
  logo_url: string;
  site_url: string;
  tvl: number;
  portfolio_item_list: Array<{
    stats: {
      asset_usd_value: number;
      debt_usd_value: number;
      net_usd_value: number;
    };
  }>;
}

export default function PortfolioPage() {
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { wallet } = useWallet();
  const [selectedChain, setSelectedChain] = useState<ChainData | null>(null);
  const [protocols, setProtocols] = useState<Protocol[]>([]); // Initialize as an empty array
  const [loadingProtocols, setLoadingProtocols] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);

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

  const handleChainClick = async (chain: ChainData) => {
    setSelectedChain(chain);
    setLoadingProtocols(true);
    try {
      const response = await fetch(`/api/debank/protocol_list?id=${wallet?.address}&chain_id=${chain.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch protocol data');
      }
      const data: Protocol[] = await response.json();
      setProtocols(data);
    } catch (error) {
      logger.error(`Error fetching protocol data: ${(error as Error).message}`);
    } finally {
      setLoadingProtocols(false);
    }
  };

  const handleProtocolClick = (protocol: Protocol) => {
    setSelectedProtocol(protocol);
  };

  const renderOverview = () => (
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
              <Card key={chain.id} onClick={() => handleChainClick(chain)} className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
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

  const renderChainDetails = () => (
    <div className="container mx-auto p-4">
      <Button onClick={() => setSelectedChain(null)} className="mb-4">Back to Overview</Button>
      <h1 className="text-3xl font-bold mb-4">{selectedChain!.name} Details</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <img src={selectedChain!.logo_url} alt={selectedChain!.name} className="w-8 h-8 mr-2" />
            {selectedChain!.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">Chain ID: {selectedChain!.id}</p>
          <p className="text-lg font-semibold">Total Value: ${selectedChain!.usd_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">DeFi Protocols</h2>
      {loadingProtocols ? (
        <Spinner size="large" color="#611BBD" />
      ) : protocols.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {protocols.map((protocol) => (
            <Card key={protocol.id} onClick={() => handleProtocolClick(protocol)} className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <img src={protocol.logo_url} alt={protocol.name} className="w-6 h-6 mr-2" />
                  {protocol.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>TVL: ${protocol.tvl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p>Your Net Value: ${protocol.portfolio_item_list.reduce((sum, item) => sum + item.stats.net_usd_value, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No protocols found for this chain.</p>
      )}
    </div>
  );

  const renderProtocolDetails = () => (
    <div className="container mx-auto p-4">
      <Button onClick={() => setSelectedProtocol(null)} className="mb-4">Back to Chain Details</Button>
      <h1 className="text-3xl font-bold mb-4">{selectedProtocol!.name} Details</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <img src={selectedProtocol!.logo_url} alt={selectedProtocol!.name} className="w-8 h-8 mr-2" />
            {selectedProtocol!.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">TVL: ${selectedProtocol!.tvl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-lg font-semibold">Your Net Value: ${selectedProtocol!.portfolio_item_list.reduce((sum, item) => sum + item.stats.net_usd_value, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <a href={selectedProtocol!.site_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Visit Protocol Site</a>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Your Positions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedProtocol!.portfolio_item_list.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Position {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Asset Value: ${item.stats.asset_usd_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p>Debt Value: ${item.stats.debt_usd_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p>Net Value: ${item.stats.net_usd_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedProtocol) {
    return renderProtocolDetails();
  }

  if (selectedChain) {
    return renderChainDetails();
  }

  return renderOverview();
}
