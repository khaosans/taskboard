import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface WalletViewProps {
  address: string;
}

export default function WalletView({ address }: WalletViewProps) {
  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    const fetchBalance = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
          const balance = await provider.getBalance(address);
          setBalance(ethers.utils.formatEther(balance));
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    fetchBalance();
  }, [address]);

  return (
    <div>
      <h2>Wallet Address: {address}</h2>
      <p>Balance: {balance} ETH</p>
    </div>
  );
}
