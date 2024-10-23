'use client';

import React from 'react';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';

export default function AIAgentsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <RobotTransformerWallpaper />
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-blue-900/5 to-purple-900/5 text-white font-sans">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">AI Agents</h1>
          <p className="text-cyan-100">This is where you can manage and interact with your AI agents.</p>
        </div>
      </div>
    </div>
  );
}
