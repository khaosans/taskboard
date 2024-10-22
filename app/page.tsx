'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import ChainInfo from '@/components/ChainInfo';
import { useTheme } from '@/hooks/useTheme';
import SolanaDataFetcher from 'components/SolanaDataFetcher';

const WelcomePage: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const [selectedChain, setSelectedChain] = React.useState('eth');
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${theme}`}>
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Welcome to Quantum Labs</h1>
          <p className="text-xl text-gray-400">Empowering your projects with AI-driven solutions</p>
        </header>

        {isSignedIn ? (
          <div className="text-center mb-16">
            <p className="text-2xl mb-4">Hello, {user?.firstName}! Ready to dive in?</p>
            <Link 
              href="/defi-dashboard" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center text-lg transition-colors duration-300"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="text-center mb-16">
            <div className="space-x-4">
              <Link 
                href="/login"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full inline-flex items-center text-lg transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up"
                className="bg-transparent hover:bg-purple-700 text-purple-600 hover:text-white font-bold py-3 px-6 rounded-full inline-flex items-center text-lg border-2 border-purple-600 transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}

        <footer className="text-center text-gray-500">
          <p>&copy; 2023 Quantum Labs. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default WelcomePage;
