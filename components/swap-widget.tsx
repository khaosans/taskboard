"use client";

import React, { useEffect, useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, Search } from "lucide-react";
import { ethers } from 'ethers';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { toast } from 'react-toastify';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

type Token = {
  id: string;
  name: string;
  symbol: string;
  address: string;
};

const staticTokens: Token[] = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' },
  { id: 'dai', name: 'Dai Stablecoin', symbol: 'DAI', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
  { id: 'usdt', name: 'Tether USD', symbol: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7' },
  { id: 'wbtc', name: 'Wrapped Bitcoin', symbol: 'WBTC', address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599' },
  { id: 'link', name: 'Chainlink', symbol: 'LINK', address: '0x514910771AF9Ca656af840dff83E8264EcF986CA' },
  { id: 'uni', name: 'Uniswap', symbol: 'UNI', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' },
  { id: 'aave', name: 'Aave', symbol: 'AAVE', address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9' },
];

export default function SwapWidget() {
  const { wallet, selectedChain, setSelectedChain } = useWallet();
  const [tokens, setTokens] = useState<Token[]>(staticTokens);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [sellToken, setSellToken] = useState(staticTokens[0]);
  const [buyToken, setBuyToken] = useState(staticTokens[1]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>(tokens);
  const [searchTerm, setSearchTerm] = useState('');
  const [balance, setBalance] = useState<string | null>(null);
  const [quote, setQuote] = useState<any>(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const filtered = tokens.filter(token =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(filtered);
  }, [searchTerm, tokens]);

  useEffect(() => {
    if (wallet) {
      fetchBalance(wallet.address);
    }
  }, [wallet, sellToken]);

  useEffect(() => {
    if (amountIn && sellToken && buyToken && selectedChain) {
      fetchQuote();
    }
  }, [amountIn, sellToken, buyToken, selectedChain]);

  const fetchBalance = async (address: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      let balanceBigNumber;
      if (sellToken.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
        balanceBigNumber = await provider.getBalance(address);
      } else {
        const tokenContract = new ethers.Contract(sellToken.address, ['function balanceOf(address) view returns (uint256)'], provider);
        balanceBigNumber = await tokenContract.balanceOf(address);
      }
      const balanceInToken = ethers.utils.formatUnits(balanceBigNumber, 18);
      setBalance(parseFloat(balanceInToken).toFixed(4));
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
    }
  };

  const fetchQuote = async () => {
    if (!amountIn || !sellToken || !buyToken || !selectedChain) {
      return;
    }

    setIsLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_0X_API_KEY;
    if (!apiKey) {
      console.error('API key is not defined');
      setIsLoading(false);
      return;
    }

    const chainId = selectedChain.id;
    const sellAmount = ethers.utils.parseUnits(amountIn, 18).toString();

    try {
      const response = await fetch(`https://api.0x.org/swap/v1/quote?chainId=${chainId}&sellToken=${sellToken.address}&buyToken=${buyToken.address}&sellAmount=${sellAmount}`, {
        headers: {
          '0x-api-key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch swap quote');
      }

      const data = await response.json();
      setQuote(data);
      setAmountOut(ethers.utils.formatUnits(data.buyAmount, 18));
      checkAllowance(data.allowanceTarget, sellAmount);
      toast.success('Quote fetched successfully');
    } catch (error) {
      console.error('Error fetching swap quote:', error);
      toast.error('Failed to fetch quote. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAllowance = async (spender: string, amount: string) => {
    if (sellToken.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
      setIsApproved(true);
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(sellToken.address, ['function allowance(address,address) view returns (uint256)'], signer);
      const allowance = await tokenContract.allowance(await signer.getAddress(), spender);
      setIsApproved(allowance.gte(amount));
    } catch (error) {
      console.error('Error checking allowance:', error);
      setIsApproved(false);
    }
  };

  const handleApprove = async () => {
    if (!quote) return;

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();

      if (sellToken.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
        // ETH doesn't need approval, so we can set isApproved to true
        setIsApproved(true);
        toast.success('ETH does not require approval');
        return;
      }

      const tokenContract = new ethers.Contract(sellToken.address, ['function approve(address,uint256) returns (bool)'], signer);
      const tx = await tokenContract.approve(quote.allowanceTarget, ethers.constants.MaxUint256);
      await tx.wait();
      setIsApproved(true);
      toast.success(`${sellToken.symbol} approved successfully`);
    } catch (error) {
      console.error('Error approving token:', error);
      toast.error(`Error approving ${sellToken.symbol}. Please try again.`);
    }
  };

  const handleSwap = async () => {
    if (!quote || !wallet) {
      toast.error('Please get a quote first');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();

      let tx;
      if (sellToken.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
        // For ETH, we need to include the value in the transaction
        tx = await signer.sendTransaction({
          ...quote,
          value: ethers.utils.parseEther(amountIn)
        });
      } else {
        tx = await signer.sendTransaction(quote);
      }

      await tx.wait();
      toast.success('Swap successful!');
      // Reset state or update UI as needed
    } catch (error) {
      console.error('Error executing swap:', error);
      toast.error('Error executing swap. Please try again.');
    }
  };

  const handleTokenChange = (type: 'sell' | 'buy', value: string) => {
    const selectedToken = tokens.find(token => token.symbol === value);
    if (selectedToken) {
      if (type === 'sell') {
        setSellToken(selectedToken);
        if (selectedToken.symbol === buyToken.symbol) {
          // If the new sell token is the same as the buy token, switch the buy token
          const otherTokens = tokens.filter(t => t.symbol !== value);
          setBuyToken(otherTokens[0]);
        }
      } else {
        setBuyToken(selectedToken);
        if (selectedToken.symbol === sellToken.symbol) {
          // If the new buy token is the same as the sell token, switch the sell token
          const otherTokens = tokens.filter(t => t.symbol !== value);
          setSellToken(otherTokens[0]);
        }
      }
    }
  };

  const handleChainChange = (chainId: number) => {
    const chain = [mainnet, polygon, optimism, arbitrum].find(c => c.id === chainId);
    if (chain) {
      setSelectedChain(chain);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-800 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Swap Tokens</CardTitle>
        <CardDescription className="text-sm">Exchange your tokens instantly on {selectedChain.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
            <Select value={sellToken.symbol} onValueChange={(value) => handleTokenChange('sell', value)}>
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
            <Select value={buyToken.symbol} onValueChange={(value) => handleTokenChange('buy', value)}>
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
            Current Balance: <span className="font-bold">{balance}</span> {sellToken.symbol}
          </div>
        )}
        <Button 
          className="w-full" 
          onClick={fetchQuote} 
          disabled={isLoading || !amountIn || !sellToken || !buyToken}
        >
          {isLoading ? 'Fetching Quote...' : 'Get Quote'}
        </Button>
        {quote && (
          <div className="text-sm">
            <p>Price: 1 {sellToken.symbol} = {parseFloat(ethers.utils.formatUnits(quote.price, 18)).toFixed(6)} {buyToken.symbol}</p>
            <p>Estimated Gas: {ethers.utils.formatUnits(quote.estimatedGas, 'gwei')} Gwei</p>
          </div>
        )}
        {wallet ? (
          sellToken.address === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' || isApproved ? (
            <Button className="w-full" onClick={handleSwap} disabled={!quote}>
              Swap Tokens
            </Button>
          ) : (
            <Button className="w-full" onClick={handleApprove}>
              Approve {sellToken.symbol}
            </Button>
          )
        ) : (
          <ConnectButton />
        )}
        <Select value={selectedChain.id.toString()} onValueChange={(value) => handleChainChange(Number(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select chain" />
          </SelectTrigger>
          <SelectContent>
            {[mainnet, polygon, optimism, arbitrum].map(chain => (
              <SelectItem key={chain.id} value={chain.id.toString()}>
                <span>{chain.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}