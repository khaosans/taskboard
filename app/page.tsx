'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { ArrowRight, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';
import { motion } from 'framer-motion';
import { headers } from 'next/headers';

const WelcomePage: React.FC = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <RobotTransformerWallpaper />
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-blue-900/5 to-purple-900/5 text-white font-sans">
        <div className="container mx-auto px-4 py-16">
          <motion.header 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Welcome to Quantum Labs</h1>
            <p className="text-xl text-cyan-100">Empowering your projects with AI-driven solutions</p>
          </motion.header>

          {isSignedIn ? (
            <div className="text-center mb-16">
              <p className="text-2xl mb-4 text-cyan-100">Hello, {user?.firstName}! Ready to dive in?</p>
              <Link href="/defi-dashboard">
                <Button size="lg" className="bg-cyan-500 text-black hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center mb-16">
              <div className="space-x-4">
                <Link href="/login">
                  <Button size="lg" className="bg-cyan-500 text-black hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="lg" variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/20 transition-all duration-300 transform hover:scale-105">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <footer className="text-center text-cyan-300">
            <p>&copy; 2023 Quantum Labs. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
