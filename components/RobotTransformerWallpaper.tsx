'use client';

import React from 'react';
import { motion } from 'framer-motion';

const RobotTransformerWallpaper: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black opacity-70" />
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.05"/>
      </svg>
      <div className="absolute inset-0">
        {/* Starship hull panels */}
        {Array.from({ length: 20 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute bg-gray-700"
            style={{
              width: `${Math.random() * 15 + 5}%`,
              height: `${Math.random() * 10 + 2}%`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              borderRadius: '4px',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Laser welding effects */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={`laser-${index}`}
            className="absolute w-0.5 bg-blue-500"
            style={{
              height: `${Math.random() * 10 + 5}%`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
              filter: [
                'brightness(1) blur(2px)',
                'brightness(1.5) blur(4px)',
                'brightness(1) blur(2px)'
              ]
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RobotTransformerWallpaper;
