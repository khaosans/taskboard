import React from 'react';
import { useWallet } from '@/hooks/useWallet';

const WalletInfo: React.FC = () => {
  const { wallet, setWallet } = useWallet();

  return (
    <div>
      {wallet ? (
        <div>
          <p>Address: {wallet.address}</p>
          <p>Type: {wallet.type}</p>
        </div>
      ) : (
        <p>No wallet connected.</p>
      )}
    </div>
  );
};

export default WalletInfo;
