import React from 'react';
import { useWallet } from '@/hooks/useWallet';

const WalletComponent = () => {
  const { wallet } = useWallet();

  return (
      <div>
          {wallet ? <p>Wallet Address: {wallet.address}</p> : <p>Loading...</p>}
  </div>
);
};

export default WalletComponent;
