'use client';

import React from 'react';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';

interface Wallet {
    address: string;
    type: string;
}

interface AuthWalletBarProps {
    onWalletChange?: (wallet: Wallet | null) => void;
    selectedWallet?: Wallet | null;
}

const AuthWalletBar: React.FC<AuthWalletBarProps> = ({ onWalletChange, selectedWallet }) => {
    const { isSignedIn, user } = useUser();

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100">
            <div>
                {isSignedIn ? (
                    <div className="flex items-center space-x-4">
                        <span>Welcome {user.firstName}!</span>
                        <UserButton />
                    </div>
                ) : (
                    <SignInButton mode="modal">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">Sign In</button>
                    </SignInButton>
                )}
            </div>
            <div>
                {selectedWallet ? (
                    <div className="flex items-center space-x-2">
                        <span>Connected: {selectedWallet.address.slice(0, 6)}...{selectedWallet.address.slice(-4)}</span>
                        <button 
                            onClick={() => onWalletChange && onWalletChange(null)} 
                            className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => {/* Implement wallet connection logic */}} 
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Connect Wallet
                    </button>
                )}
            </div>
        </nav>
    );
};

export default AuthWalletBar;
