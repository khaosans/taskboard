'use client';

import React from 'react';
import { motion } from 'framer-motion';

const RobotTransformerWallpaper: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black opacity-70" />
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="holographic">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="10" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="30" />
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <g filter="url(#holographic)">
          {/* Add holographic circles for a more visible effect */}
          {Array.from({ length: 15 }).map((_, index) => (
            <motion.circle
              key={index}
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r={Math.random() * 3 + 1}
              fill="url(#holographicGradient)"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
        <defs>
          <linearGradient id="holographicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#ff00ff", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#00ffff", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2a2a2a 1px, transparent 1px),
            linear-gradient(to bottom, #2a2a2a 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  );
};

export default RobotTransformerWallpaper;
