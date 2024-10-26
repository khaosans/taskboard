import React from 'react';
import { Wallet } from '../app/types';

interface WalletInfoProps {
  wallet: Wallet | null;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ wallet }) => {
  return (
    <div>
      {wallet ? <p>Wallet Address: {wallet.address}</p> : <p>No wallet connected</p>}
    </div>
  );
};

export default WalletInfo;
