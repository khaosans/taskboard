"use client"

import React from 'react';
import Link from 'next/link'; // Import Link from Next.js
import { Home, Users, BarChart2, ClipboardList } from 'lucide-react';

const NavBar = () => {
    return (
        <nav className="relative">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/" className="text-gray-700 hover:text-gray-900 flex items-center">
                        <Home className="h-5 w-5 mr-1" />
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard" className="text-gray-700 hover:text-gray-900 flex items-center">
                        <ClipboardList className="h-5 w-5 mr-1" />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/task-agent-analytics" className="text-gray-700 hover:text-gray-900 flex items-center">
                        <BarChart2 className="h-5 w-5 mr-1" />
                        Task Agent Analytics
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;