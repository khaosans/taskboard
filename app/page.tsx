'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '../hooks/useTheme';
import Footer from '../components/footer';
import Header from '../components/Header';

const WelcomePage: React.FC = () => {
  const [selectedChain, setSelectedChain] = React.useState('eth');
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${theme}`}>
      <Header />
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Welcome to Quantum Labs</h1>
          <p className="text-xl text-gray-400">Empowering your projects with AI-driven solutions</p>
        </header>

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

        <footer className="text-center text-gray-500">
          <p>&copy; 2023 Quantum Labs. All rights reserved.</p>
        </footer>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
