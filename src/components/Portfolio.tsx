import React, { useEffect, useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { ethers } from 'ethers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Spinner from '@/components/Spinner';

interface PortfolioData {
  address: string;
  balance: string;
  tokens: Array<{
    symbol: string;
    balance: string;
  }>;
}

const Portfolio: React.FC = () => {
  const { wallet } = useWallet();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!wallet) {
        setPortfolio(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balanceWei = await provider.getBalance(address);
        const balance = ethers.utils.formatEther(balanceWei);

        // Here you would typically fetch token balances from an API or smart contract
        // For this example, we'll use dummy data
        const tokens = [
          { symbol: 'ETH', balance },
          { symbol: 'DAI', balance: '100.00' },
          { symbol: 'USDC', balance: '50.00' },
        ];

        setPortfolio({ address, balance, tokens });
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError('Failed to fetch portfolio data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [wallet]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="text-center">
        <p>No wallet connected. Please connect a wallet to view your portfolio.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Wallet Address</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-mono">{portfolio.address}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{parseFloat(portfolio.balance).toFixed(4)} ETH</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Token Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {portfolio.tokens.map((token) => (
              <li key={token.symbol} className="flex justify-between">
                <span>{token.symbol}</span>
                <span>{parseFloat(token.balance).toFixed(4)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
