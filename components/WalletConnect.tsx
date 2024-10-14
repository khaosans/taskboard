"use client"; // Mark this component as a Client Component

import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../utils/connectors'; // Create this file for connectors

const WalletConnect = () => {
    const { activate, account, library } = useWeb3React();

    const connectWallet = async () => {
        try {
            await activate(injected);
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    return (
        <div>
            {account ? (
                <div>
                    <p>Connected: {account}</p>
                </div>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletConnect;
