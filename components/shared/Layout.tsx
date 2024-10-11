'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TopBar from '@/components/navigation/TopBar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const [selectedWallet, setSelectedWallet] = useState<{ address: string; type: string } | null>(null);

    // Add routes where you don't want the TopBar to appear
    const routesWithoutTopBar = ['/login', '/signup'];

    const showTopBar = pathname ? !routesWithoutTopBar.includes(pathname) : true;

    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensure localStorage is used in a client-side context
            const savedWallet = localStorage.getItem('selectedWallet');
            if (savedWallet) {
                setSelectedWallet(JSON.parse(savedWallet));
            }
        }
    }, []);

    const handleWalletChange = (wallet: { address: string; type: string } | null) => {
        setSelectedWallet(wallet);
        if (typeof window !== 'undefined') { // Ensure localStorage is used in a client-side context
            if (wallet) {
                localStorage.setItem('selectedWallet', JSON.stringify(wallet));
            } else {
                localStorage.removeItem('selectedWallet');
            }
        }
    };
    return (
        <>
            {showTopBar && <TopBar />}
            <main>{children}</main>
        </>
    );
};

export default Layout;