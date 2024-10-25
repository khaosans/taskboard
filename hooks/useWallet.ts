import { useState } from 'react';

export interface Wallet {
  address: string;
  type: string;
  total_usd_value: number;
}

export interface WalletState {
  wallet: Wallet | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

export const useWallet = (): WalletState => {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const connectWallet = () => {
    // Implement your wallet connection logic here
    // For example:
    setWallet({
      address: '0x1234...5678',
      type: 'Ethereum',
      total_usd_value: 1000
    });
  };

  const disconnectWallet = () => {
    setWallet(null);
  };

  return { wallet, connectWallet, disconnectWallet };
};
