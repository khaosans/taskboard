import { useState, useEffect } from 'react';

interface Wallet {
  total_usd_value: number;
  address: string;
  type: string;
}

interface WalletState {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet | null) => void;
}

export function useWallet(): WalletState {
  const [wallet, setWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    const savedWallet = localStorage.getItem('connectedWallet');
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet));
    }
  }, []);

  return { wallet, setWallet };
}
