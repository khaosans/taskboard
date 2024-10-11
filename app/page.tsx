'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { ArrowRight, Brain, Cog, Users, Zap, BarChart, Shield } from 'lucide-react';
import ChatBotModal from '@/components/ChatbotModal';

const WelcomePage: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to Quantum Labs</h1>
        <p className="text-xl text-gray-400">Empowering your projects with AI-driven solutions</p>
      </header>

      {/* Rest of the content */}
      {/* ... */}

      {isModalOpen && <ChatBotModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

// FeatureCard component definition
// ...

export default WelcomePage;