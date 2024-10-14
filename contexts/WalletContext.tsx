import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Chain, mainnet } from 'wagmi/chains';

interface WalletContextType {
  wallet: { address: string; type: string } | null;
  supportedChains: Chain[];
  selectedChain: Chain;
  connectWallet: () => void;
  disconnectWallet: () => void;
  setSelectedChain: (chain: Chain) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address, connector } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [wallet, setWallet] = useState<{ address: string; type: string } | null>(null);
  const [supportedChains] = useState<Chain[]>([mainnet]); // Add more chains as needed
  const [selectedChain, setSelectedChain] = useState<Chain>(mainnet);

  useEffect(() => {
    if (address && connector) {
      setWallet({ address, type: connector.name });
    } else {
      setWallet(null);
    }
  }, [address, connector]);

  const connectWallet = () => {
    const connector = connectors[0]; // Use the first available connector
    if (connector) {
      connect({ connector });
    }
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return (
    <WalletContext.Provider value={{ 
      wallet, 
      supportedChains, 
      selectedChain, 
      connectWallet, 
      disconnectWallet, 
      setSelectedChain 
    }}>
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
