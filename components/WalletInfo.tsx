import React from 'react';
import { useWallet } from '@/hooks/useWallet';

const WalletInfo: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();

  return (
    <div>
      {wallet ? (
        <div>
          <p>Address: {wallet.address}</p>
          <p>Type: {wallet.type}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      ) : (
        <div>
          <p>No wallet connected.</p>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
};

export default WalletInfo;
