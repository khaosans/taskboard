'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { ArrowRight, Brain, Cog, Users, Zap, BarChart, Shield } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Welcome to Quantum Labs</h1>
          <p className="text-xl text-gray-400">Empowering your projects with AI-driven solutions</p>
        </header>

        {isSignedIn ? (
          <div className="text-center mb-16">
            <p className="text-2xl mb-4">Hello, {user?.firstName}! Ready to dive in?</p>
            <Link 
              href="/dashboard" 
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

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="h-12 w-12 text-purple-500" />}
              title="AI Agents"
              description="Leverage our intelligent AI agents for various tasks, from data analysis to content creation."
            />
            <FeatureCard 
              icon={<Cog className="h-12 w-12 text-purple-500" />}
              title="Task Management"
              description="Efficiently manage and track your projects with our intuitive task management system."
            />
            <FeatureCard 
              icon={<Users className="h-12 w-12 text-purple-500" />}
              title="Collaboration"
              description="Work seamlessly with your team members in real-time, enhancing productivity and communication."
            />
            <FeatureCard 
              icon={<Zap className="h-12 w-12 text-purple-500" />}
              title="Automation"
              description="Automate repetitive tasks and workflows to save time and reduce errors."
            />
            <FeatureCard 
              icon={<BarChart className="h-12 w-12 text-purple-500" />}
              title="Analytics"
              description="Gain valuable insights with our advanced analytics and reporting tools."
            />
            <FeatureCard 
              icon={<Shield className="h-12 w-12 text-purple-500" />}
              title="Security"
              description="Rest easy knowing your data is protected with our state-of-the-art security measures."
            />
          </div>
        </section>

        <footer className="text-center text-gray-500">
          <p>&copy; 2023 Quantum Labs. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-4">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default WelcomePage;