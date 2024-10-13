'use client';

import React from 'react';
import TopBar from './TopBar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            <TopBar onWalletChange={() => {}} selectedWallet={null} />
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
};

export default Layout;
