'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brain, Shield, Coins } from 'lucide-react';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white overflow-hidden">
      <div className="circuit-background"></div>
      <header 
        className="px-4 lg:px-6 h-14 flex items-center fixed w-full z-50 transition-colors duration-300"
        style={{ 
          backgroundColor: `rgba(17, 24, 39, ${Math.min(scrollY / 500, 0.9)})`,
          boxShadow: scrollY > 50 ? '0 2px 4px rgba(0,0,0,.1)' : 'none'
        }}
      >
        <div className="logo-container mr-4">
          <svg className="w-32 h-8" viewBox="0 0 128 32">
            <defs>
              <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6">
                  <animate attributeName="stop-color" values="#8B5CF6; #D8B4FE; #8B5CF6" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#D8B4FE">
                  <animate attributeName="stop-color" values="#D8B4FE; #8B5CF6; #D8B4FE" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <text x="0" y="25" fontSize="24" fontWeight="bold" fill="url(#logo-gradient)">BlockFlow</text>
          </svg>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-purple-400 transition-colors" href="#pricing">
            Pricing
          </Link>
        </nav>
      </header>
      <main className="flex-1 pt-14">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Revolutionize Your Workflow with BlockFlow
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Harness the power of AI, blockchain, and DeFi for unparalleled project management and productivity.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 text-white border-gray-700"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700" type="submit">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  Start your free 14-day trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Key Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-700 p-4 rounded-lg">
                <Brain className="h-8 w-8 text-purple-500" />
                <h3 className="text-xl font-bold">AI-Powered Assistance</h3>
                <p className="text-gray-300 text-center">Intelligent task prioritization and resource allocation.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-700 p-4 rounded-lg">
                <Shield className="h-8 w-8 text-purple-500" />
                <h3 className="text-xl font-bold">Blockchain Security</h3>
                <p className="text-gray-300 text-center">Immutable task records and enhanced data integrity.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-700 p-4 rounded-lg">
                <Coins className="h-8 w-8 text-purple-500" />
                <h3 className="text-xl font-bold">DeFi Integration</h3>
                <p className="text-gray-300 text-center">Tokenized rewards and decentralized project funding.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-8">About BlockFlow</h2>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-gray-300">
                  At BlockFlow, we're on a mission to transform project management through cutting-edge technology. 
                  By combining AI, blockchain, and DeFi, we're creating a platform that not only enhances productivity 
                  but also ensures security, transparency, and fair rewards for all team members.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Why Choose BlockFlow?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Brain className="h-5 w-5 text-purple-500 mr-2" />
                    <span>AI-driven insights for smarter decision making</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Unparalleled security with blockchain technology</span>
                  </li>
                  <li className="flex items-center">
                    <Coins className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Innovative reward system with DeFi integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Pricing Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col p-6 bg-gray-900 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Starter</h3>
                <p className="text-4xl font-bold mb-4">$19<span className="text-xl font-normal">/month</span></p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <Brain className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Basic AI task prioritization</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Blockchain-secured task records</span>
                  </li>
                </ul>
                <Button className="mt-auto bg-purple-600 hover:bg-purple-700">Get Started</Button>
              </div>
              <div className="flex flex-col p-6 bg-gray-900 rounded-lg border-2 border-purple-500">
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <p className="text-4xl font-bold mb-4">$49<span className="text-xl font-normal">/month</span></p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <Brain className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Advanced AI agents</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Smart contract integration</span>
                  </li>
                  <li className="flex items-center">
                    <Coins className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Basic DeFi features</span>
                  </li>
                </ul>
                <Button className="mt-auto bg-purple-600 hover:bg-purple-700">Get Started</Button>
              </div>
              <div className="flex flex-col p-6 bg-gray-900 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <p className="text-4xl font-bold mb-4">Custom</p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <Brain className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Custom AI model training</span>
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Advanced blockchain features</span>
                  </li>
                  <li className="flex items-center">
                    <Coins className="h-5 w-5 text-purple-500 mr-2" />
                    <span>Full DeFi suite with custom token</span>
                  </li>
                </ul>
                <Button className="mt-auto bg-purple-600 hover:bg-purple-700">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-800 border-t border-gray-700">
        <div className="container px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© 2024 BlockFlow. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link className="text-sm text-gray-400 hover:text-purple-400 transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm text-gray-400 hover:text-purple-400 transition-colors" href="#">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
      <style jsx>{`
        .circuit-background {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M50 50h50v50H50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          background-size: cover;
          opacity: 0.1;
        }
      `}</style>
    </div>
  );
}