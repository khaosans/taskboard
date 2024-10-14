"use client"; // Mark this component as a Client Component

import React, { useEffect, useState } from 'react';
import { useWallet } from '@/contexts/WalletContext'; // Import useWallet
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, Search } from "lucide-react";
import { ethers } from 'ethers';

type Token = {
  id: string;
  name: string;
  symbol: string;
};

// Static list of tokens for demonstration
const staticTokens: Token[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'tether', name: 'Tether', symbol: 'USDT' },
  // Add more tokens as needed
];

export default function SwapWidget() {
  const { wallet, supportedChains, selectedChain, setSelectedChain } = useWallet(); // Get wallet and supported chains from context
  const [tokens, setTokens] = useState<Token[]>(staticTokens); // Use static tokens
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [sellToken, setSellToken] = useState('ETH');
  const [buyToken, setBuyToken] = useState('DAI');
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokens);
  const [searchTerm, setSearchTerm] = useState('');
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const filtered = tokens.filter(token =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(filtered);
  }, [searchTerm, tokens]);

  useEffect(() => {
    if (wallet) {
      fetchBalance(wallet.address); // Fetch balance when wallet is connected
    }
  }, [wallet]);

  const fetchBalance = async (address: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const balanceBigNumber = await provider.getBalance(address);
      const balanceInEther = ethers.utils.formatEther(balanceBigNumber);
      setBalance(parseFloat(balanceInEther).toFixed(4));
    } catch (error) {
      window.console.error('Error fetching balance:', error); // Use window.console
      setBalance(null);
    }
  };

  const handleSwap = async () => {
    const apiKey = window.process?.env.NEXT_PUBLIC_0X_API_KEY; // Use window.process
    if (!apiKey) {
      window.console.error('API key is not defined'); // Use window.console
      return;
    }
    const chainId = selectedChain?.id; // Use the selected chain ID
    const sellAmount = amountIn;
    const sellTokenAddress = sellToken;
    const buyTokenAddress = buyToken;

    try {
      const response = await fetch(`https://api.0x.org/gasless/quote?chainId=${chainId}&sellToken=${sellTokenAddress}&buyToken=${buyTokenAddress}&sellAmount=${sellAmount}&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`, {
        method: 'GET',
        headers: {
          '0x-api-key': apiKey,
          '0x-version': 'v2',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch swap quote');
      }

      const data = await response.json();
      window.console.log('Swap Quote:', data); // Use window.console
      setAmountOut(data.buyAmount);
    } catch (error) {
      window.console.error('Error fetching swap quote:', error); // Use window.console
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Swap Tokens</CardTitle>
        <CardDescription className="text-sm">Exchange your tokens instantly</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="chainSelect" className="text-sm font-medium">Select Chain</label>
          <Select value={selectedChain?.id.toString() || ''} onValueChange={(value) => setSelectedChain(supportedChains.find(chain => chain.id.toString() === value)!)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select chain" />
            </SelectTrigger>
            <SelectContent>
              {supportedChains.map(chain => (
                <SelectItem key={chain.id} value={chain.id.toString()}>
                  <span>{chain.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="amountIn" className="text-sm font-medium">You Pay</label>
          <div className="flex space-x-2">
            <Input
              id="amountIn"
              type="text"
              value={amountIn}
              onChange={(e) => setAmountIn(e.target.value)}
              placeholder="0.0"
              className="flex-grow bg-gray-700 text-white"
            />
            <Select value={sellToken} onValueChange={setSellToken}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {filteredTokens.map(token => (
                  <SelectItem key={token.id} value={token.symbol}>
                    <span>{token.symbol}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-center">
          <Button variant="outline" size="icon" onClick={() => {
            const temp = sellToken;
            setSellToken(buyToken);
            setBuyToken(temp);
          }}>
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <label htmlFor="amountOut" className="text-sm font-medium">You Receive</label>
          <div className="flex space-x-2">
            <Input
              id="amountOut"
              type="text"
              value={amountOut}
              readOnly
              placeholder="0.0"
              className="flex-grow bg-gray-700 text-white"
            />
            <Select value={buyToken} onValueChange={setBuyToken}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {filteredTokens.map(token => (
                  <SelectItem key={token.id} value={token.symbol}>
                    <span>{token.symbol}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="relative">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tokens"
            className="pl-10 bg-gray-700 text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        {wallet && (
          <div className="text-sm text-green-400">
            Wallet Connected: {wallet.address}
          </div>
        )}
        {balance && (
          <div className="text-sm text-white">
            Current Balance: <span className="font-bold">{balance}</span> {sellToken}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSwap}>
          Swap Tokens
        </Button>
      </CardFooter>
    </Card>
  );
}