'use client';

import React from 'react';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Quantum Labs</h1>
      <p className="text-xl mb-8">Empowering your projects with AI-driven solutions</p>
      <div className="space-x-4">
        <a href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Sign In
        </a>
        <a href="/sign-up" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default WelcomePage;
