'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';
import { useWallet } from '@/hooks/useWallet';

import Spinner from '@/components/Spinner';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface ExtendedProvider extends ethers.providers.ExternalProvider {
  isMetaMask?: boolean;
  isRabby?: boolean;
}

const Web3SignIn: React.FC = () => {
  const [evmWallet, setEVMWallet] = useState<{ address: string; type: string } | null>(null);
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkAvailableWallets = () => {
      const wallets = [];
      if ((window as any).ethereum?.isMetaMask) wallets.push('MetaMask');
      if ((window as any).ethereum?.isRabby || (window as any).rabby) wallets.push('Rabby');
      setAvailableWallets(wallets);
    };

    checkAvailableWallets();
    loadConnectedWallet();
  }, []);

  const loadConnectedWallet = () => {
    if ((window as any)) {
      const savedWallet = (window as any).localStorage.getItem('connectedWallet');
      if (savedWallet) {
        const wallet = JSON.parse(savedWallet);
        setEVMWallet(wallet);
        fetchBalance(wallet.address);
      }
    }
  };

  const getProvider = (type: string): ExtendedProvider | null => {
    if ((window as any)) {
      const { ethereum } = (window as any);
      if (type === 'MetaMask' && ethereum?.isMetaMask) {
        return ethereum as ExtendedProvider;
      } else if (type === 'Rabby' && (ethereum?.isRabby || (window as any).rabby)) {
        return (window as any).rabby || ethereum as ExtendedProvider;
      }
      return null;
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
      
      await ethersProvider.send("eth_requestAccounts", []);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      
      const newWallet = { address, type: walletType };
      setEVMWallet(newWallet);
      if ((window as any)) {
        (window as any).localStorage.setItem('connectedWallet', JSON.stringify(newWallet));
      }
      fetchBalance(address);
      toast.success(`${walletType} wallet connected successfully`);
    } catch (error) {
      (window as any).console.error("Failed to connect wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setEVMWallet(null);
    setBalance(null);
    if ((window as any)) {
      (window as any).localStorage.removeItem('connectedWallet');
    }
    toast.success('Wallet disconnected');
  };

  const fetchBalance = async (address: string) => {
    try {
      if ((window as any)) {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
        const balanceBigNumber = await provider.getBalance(address);
        const balanceInEther = ethers.utils.formatEther(balanceBigNumber);
        setBalance(parseFloat(balanceInEther).toFixed(4));
      }
    } catch (error) {
      (window as any).console.error('Error fetching balance:', error);
      setBalance(null);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getConnectedWallet = () => {
    return evmWallet;
  };

  const connectedWallet = getConnectedWallet();

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
          ) : connectedWallet ? (
            `${connectedWallet.type}: ${truncateAddress(connectedWallet.address)}`
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
                {connectedWallet ? (
                  <>
                    <div className="p-2 text-white">
                      <p>Connected to {connectedWallet.type}</p>
                      <p className="text-sm text-gray-400">{truncateAddress(connectedWallet.address)}</p>
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
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-white hover:bg-gray-700"
                          onClick={() => connectWallet(wallet)}
                          disabled={isConnecting}
                        >
                          {isConnecting ? 'Connecting...' : `Connect ${wallet}`}
                        </Button>
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
