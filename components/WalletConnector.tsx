'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wallet, AlertTriangle } from 'lucide-react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ethers } from 'ethers';

type WalletType = 'solana' | 'ethereum';

interface WalletConnectorProps {
  walletType: WalletType;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ walletType }) => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [defiValue, setDefiValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!address) return;

    setLoading(true);
    setError(null);
    try {
      if (walletType === 'solana') {
        const connection = new Connection('https://api.devnet.solana.com');
        const publicKey = new PublicKey(address);
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      } else if (walletType === 'ethereum') {
        const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR-PROJECT-ID');
        const balance = await provider.getBalance(address);
        setBalance(parseFloat(ethers.utils.formatEther(balance)));
      }
    } catch (err) {
      setError(`Failed to fetch balance: ${(err as Error).message}`);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }, [address, walletType]);

  useEffect(() => {
    if (connected) {
      fetchBalance();
      const interval = setInterval(fetchBalance, 30000); // Fetch balance every 30 seconds
      return () => clearInterval(interval);
    }
  }, [connected, fetchBalance]);

  const handleConnect = () => {
    if (address) {
      setConnected(true);
      fetchBalance();
    }
  };

  const handleDisconnect = () => {
    setConnected(false);
    setBalance(null);
    setDefiValue(null);
    setAddress('');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wallet className="mr-2 h-6 w-6" /> Connect Your {walletType.charAt(0).toUpperCase() + walletType.slice(1)} Wallet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handleConnect(); }}>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={`Enter your ${walletType} wallet address`}
            className="mb-4"
            disabled={connected}
          />
          {!connected ? (
            <Button type="submit" className="w-full" disabled={loading || !address}>
              {loading ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          ) : (
            <Button onClick={handleDisconnect} className="w-full bg-red-500 hover:bg-red-600">
              Disconnect Wallet
            </Button>
          )}
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {balance !== null && (
          <Alert className="mt-4">
            <AlertTitle>Wallet Balance</AlertTitle>
            <AlertDescription>
              {balance.toFixed(4)} {walletType === 'solana' ? 'SOL' : 'ETH'}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletConnector;
