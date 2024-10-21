'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/hooks/useTheme';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Settings } from 'lucide-react';

const isUserLoggedIn = () => {
  return true; // Change this to false to test logged-out state
};

const signOut = async () => {
  console.log('User signed out');
};

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const isAuthPage = pathname === '/login' || pathname === '/signup';

  return (
    <header className={`w-full py-4 fixed top-0 left-0 right-0 z-10 bg-white shadow`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <img src="/images/image.svg" alt="QuantumLabs Logo" className="h-10" />
        </Link>
        {!isAuthPage && (
          <nav>
            <ul className="flex space-x-4 items-center">
              <li><Link href="/dashboard" className={`hover:underline ${pathname === '/dashboard' ? 'font-bold' : ''}`}>Dashboard</Link></li>
              <li><Link href="/agents" className={`hover:underline ${pathname === '/agents' ? 'font-bold' : ''}`}>Agents</Link></li>
              <li><Link href="/projects" className={`hover:underline ${pathname === '/projects' ? 'font-bold' : ''}`}>Projects</Link></li>
              <li><Link href="/settings" className={`hover:underline ${pathname === '/settings' ? 'font-bold' : ''}`}>Settings</Link></li>
              {isUserLoggedIn() ? (
                <li>
                  <button 
                    onClick={handleSignOut}
                    className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}
                  >
                    Sign Out
                  </button>
                </li>
              ) : (
                <>
                  <li><Link href="/login" className={`hover:underline ${pathname === '/login' ? 'font-bold' : ''}`}>Log in</Link></li>
                  <li>
                    <Button>
                      <Link href="/signup" className="text-white">Sign up</Link>
                    </Button>
                  </li>
                </>
              )}
              <li>
                <button 
                  onClick={toggleTheme}
                  className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}