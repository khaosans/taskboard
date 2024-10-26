import { useState, useEffect } from 'react';
import { useWallet as solanaUseWallet } from '@solana/wallet-adapter-react';

interface Wallet {
  address: string;
  // Add other wallet properties here
}

const useWallet = () => {
  const { wallet } = solanaUseWallet();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const connectWallet = async () => {
      if (wallet) {
        await wallet.adapter.connect();
        setWalletAddress(wallet.adapter.publicKey?.toBase58() || null);
      }
    };

    connectWallet();
  }, [wallet]);

  return { wallet: { address: walletAddress } };
};

export default useWallet;
