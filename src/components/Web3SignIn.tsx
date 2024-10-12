'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';
import { useWallet } from '@/contexts/WalletContext';
import Spinner from './Spinner';

interface ExtendedProvider extends ethers.providers.ExternalProvider {
  isMetaMask?: boolean;
  isRabby?: boolean;
}

interface Web3SignInProps {
  onWalletChange: (wallet: { address: string; type: string } | null) => void;
}

const Web3SignIn: React.FC<Web3SignInProps> = ({ onWalletChange }) => {
  const { wallet, setWallet } = useWallet();
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkAvailableWallets = () => {
      const wallets = [];
      if ((window.ethereum as ExtendedProvider)?.isMetaMask) wallets.push('MetaMask');
      if ((window.ethereum as ExtendedProvider)?.isRabby || (window as any).rabby) wallets.push('Rabby');
      setAvailableWallets(wallets);
    };

    checkAvailableWallets();
    loadConnectedWallet();
  }, []);

  const loadConnectedWallet = () => {
    const savedWallet = localStorage.getItem('connectedWallet');
    if (savedWallet) {
      const wallet = JSON.parse(savedWallet);
      setWallet(wallet);
      onWalletChange(wallet);
      fetchBalance(wallet.address);
    }
  };

  const getProvider = (type: string): ExtendedProvider | null => {
    if (type === 'MetaMask' && (window.ethereum as ExtendedProvider)?.isMetaMask) {
      return window.ethereum as ExtendedProvider;
    } else if (type === 'Rabby' && ((window.ethereum as ExtendedProvider)?.isRabby || window.rabby)) {
      return ((window as any).rabby || window.ethereum) as ExtendedProvider;
    }
    return null;
  };

  const connectWallet = async (walletType: string) => {
    try {
      setIsConnecting(true);
      const provider = getProvider(walletType);
      if (!provider) {
        throw new Error(`${walletType} provider not found`);
      }
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      
      // Artificial delay for visibility (3 seconds)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      await ethersProvider.send("eth_requestAccounts", []);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      
      const newWallet = { address, type: walletType };
      setWallet(newWallet);
      localStorage.setItem('connectedWallet', JSON.stringify(newWallet));
      onWalletChange(newWallet);
      fetchBalance(address);
      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    setBalance(null);
    localStorage.removeItem('connectedWallet');
    onWalletChange(null);
    toast.success('Wallet disconnected');
  };

  const fetchBalance = async (address: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any, "any");
      const balanceBigNumber = await provider.getBalance(address);
      const balanceInEther = ethers.utils.formatEther(balanceBigNumber);
      setBalance(parseFloat(balanceInEther).toFixed(4));
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(null);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700 relative"
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <Spinner size="small" className="mr-2" />
              Connecting...
            </>
          ) : wallet ? (
            `${wallet.type}: ${truncateAddress(wallet.address)}`
          ) : (
            'Connect Wallet'
          )}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content 
              className="bg-gray-800 rounded-md shadow-lg p-2 mt-2 border border-gray-700 w-64"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {wallet ? (
                  <>
                    <div className="p-2 text-white">
                      <p>Connected to {wallet.type}</p>
                      <p className="text-sm text-gray-400">{truncateAddress(wallet.address)}</p>
                      {balance && <p className="mt-2">Balance: {balance} ETH</p>}
                    </div>
                    <DropdownMenu.Item 
                      className="cursor-pointer p-2 hover:bg-gray-700 text-white rounded"
                      onSelect={disconnectWallet}
                    >
                      Disconnect Wallet
                    </DropdownMenu.Item>
                  </>
                ) : (
                  availableWallets.map((wallet) => (
                    <DropdownMenu.Item 
                      key={wallet}
                      className="cursor-pointer p-2 hover:bg-gray-700 text-white rounded" 
                      onSelect={() => connectWallet(wallet)}
                      disabled={isConnecting}
                    >
                      <motion.div whileHover={{ x: 5 }} className="flex items-center">
                        {isConnecting ? <Spinner size="small" className="mr-2" /> : null}
                        <span>{isConnecting ? 'Connecting...' : `Connect ${wallet}`}</span>
                      </motion.div>
                    </DropdownMenu.Item>
                  ))
                )}
              </motion.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenu.Root>
  );
};

export default Web3SignIn;