'use client';

import React from 'react';
import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';

const TopBar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-xl font-bold">
                    TaskFlow
                </Link>
                <div className="flex items-center">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </nav>
    );
};

export default TopBar;
