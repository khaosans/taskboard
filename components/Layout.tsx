'use client';

import React from 'react';
import TopBar from './TopBar';
import { usePathname } from 'next/navigation';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();

    // Add routes where you don't want the TopBar to appear
    const routesWithoutTopBar = ['/login', '/signup'];

    const showTopBar = pathname ? !routesWithoutTopBar.includes(pathname) : true;

    return (
        <>
            {showTopBar && <TopBar />}
            <main>{children}</main>
        </>
    );
};

export default Layout;