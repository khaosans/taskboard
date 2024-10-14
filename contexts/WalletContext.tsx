import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Network {
  id: string;
  name: string;
  provider: string;
}

interface Wallet {
  address: string;
  type: string;
}

interface WalletContextType {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet | null) => void;
  networks: Network[];
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const networks: Network[] = [
    { id: 'ethereum', name: 'Ethereum', provider: 'homestead' },
    { id: 'optimism', name: 'Optimism', provider: 'optimism-mainnet' },
    { id: 'arbitrum', name: 'Arbitrum', provider: 'arbitrum-mainnet' },
  ];

  return (
    <WalletContext.Provider value={{ wallet, setWallet, networks }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
