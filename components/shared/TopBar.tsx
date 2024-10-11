'use client';

import React from 'react';

interface TopBarProps {
  onWalletChange: (wallet: { address: string; type: string } | null) => void;
  selectedWallet: { address: string; type: string } | null;
}

const TopBar: React.FC<TopBarProps> = ({ onWalletChange, selectedWallet }) => {
  return (
    <div className="top-bar">
      {/* Add top bar content here */}
      <button onClick={() => onWalletChange(null)}>Change Wallet</button>
      {selectedWallet && <span>{selectedWallet.address}</span>}
    </div>
  );
};

export default TopBar;