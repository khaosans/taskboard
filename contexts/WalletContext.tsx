import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface Wallet {
  address: string;
  type: string;
}

interface Chain {
  id: number;
  name: string;
}

interface WalletContextType {
  wallet: Wallet | null;
  supportedChains: Chain[];
  selectedChain: Chain | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  setSelectedChain: (chain: Chain) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(() => {
    const savedWallet = localStorage.getItem('connectedWallet');
    return savedWallet ? JSON.parse(savedWallet) : null;
  });
  const [supportedChains, setSupportedChains] = useState<Chain[]>([]);
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);

  const fetchSupportedChains = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const network = await provider.getNetwork();
      const chain = { id: network.chainId, name: network.name };
      setSupportedChains([chain]);
      setSelectedChain(chain); // Set the default selected chain
    } catch (error) {
      console.error('Error fetching supported chains:', error);
    }
  };

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      await provider.send("eth_requestAccounts", []);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        const newWallet = { address: accounts[0], type: 'MetaMask' };
        setWallet(newWallet);
        localStorage.setItem('connectedWallet', JSON.stringify(newWallet)); // Store wallet in localStorage
        fetchSupportedChains(); // Fetch chains after connecting
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    localStorage.removeItem('connectedWallet'); // Remove wallet from localStorage
    setSupportedChains([]); // Clear supported chains on disconnect
    setSelectedChain(null); // Clear selected chain on disconnect
  };

  useEffect(() => {
    if (wallet) {
      fetchSupportedChains();
    }
  }, [wallet]);

  return (
    <WalletContext.Provider value={{ wallet, supportedChains, selectedChain, connectWallet, disconnectWallet, setSelectedChain }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
