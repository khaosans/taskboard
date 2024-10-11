'use client';

import React from 'react';
import RobotTransformerWallpaper from './RobotTransformerWallpaper';
import { motion } from 'framer-motion';

export default function RobotTransformerWallpaperDemo() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <RobotTransformerWallpaper />
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          className="p-8 bg-gray-900/30 backdrop-blur-xl rounded-lg shadow-lg border border-blue-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-300 rounded mb-4 animate-pulse shadow-lg" />
          <div className="h-4 w-32 bg-gradient-to-r from-blue-400 to-cyan-300 rounded mb-2 shadow-md" />
          <div className="h-4 w-48 bg-gradient-to-r from-blue-400 to-cyan-300 rounded shadow-md" />
        </motion.div>
      </div>
    </div>
  );
}