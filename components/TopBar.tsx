'use client';

import React from 'react';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';

interface Wallet {
    address: string;
    type: string;
}

interface TopBarProps {
    onWalletChange: (wallet: Wallet | null) => void;
    selectedWallet: Wallet | null;
}

const TopBar: React.FC<TopBarProps> = ({ onWalletChange, selectedWallet }) => {
    const { isSignedIn, user } = useUser();

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100">
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
            {/* Add your wallet selection logic here */}
        </nav>
    );
};

export default TopBar;
