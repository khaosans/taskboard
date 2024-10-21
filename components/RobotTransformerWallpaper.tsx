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
<<<<<<< HEAD
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
=======
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
      {/* Add animated laser lines */}
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"
          style={{ left: `${Math.random() * 100}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0], y: [-100, 100] }}
          transition={{
            duration: Math.random() * 5 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Add logo with shine and glow effect */}
      <div className="absolute top-10 left-10">
        <motion.img
          src="/logo.png"
          alt="Logo"
          className="w-32 h-32"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: [0.8, 1, 0.8], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
          }}
        />
>>>>>>> 6bc7109 (Refactor: Update link in WelcomePage and add animated laser lines and logo effects in RobotTransformerWallpaper)
      </div>
    </div>
  );
};

export default RobotTransformerWallpaper;
