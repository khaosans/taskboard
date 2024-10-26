import React from 'react';
import useWallet from '@/hooks/useWallet';

const WalletInfo: React.FC = () => {
  const { wallet } = useWallet();

  return (
    <div>
      {/* Display wallet information */}
      {wallet ? <p>Wallet Address: {wallet}</p> : <p>No wallet connected</p>}
    </div>
  );
};

export default WalletInfo;
