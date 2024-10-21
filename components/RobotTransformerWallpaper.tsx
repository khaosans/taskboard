'use client';

import React from 'react';

const RobotTransformerWallpaper: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-purple-900/30" />
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(100, 200, 255, 0.5)"
              strokeWidth="0.5"
            />
          </pattern>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(100, 200, 255, 0.5)" />
            <stop offset="100%" stopColor="rgba(100, 200, 255, 0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Animated circles (planets) */}
        {[...Array(5)].map((_, i) => (
          <g key={`planet-${i}`}>
            <circle
              cx={`${10 + i * 20}%`}
              cy={`${20 + (i % 3) * 30}%`}
              r="10"
              fill={`rgba(${100 + i * 30}, ${150 + i * 20}, 255, 0.8)`}
            >
              <animate
                attributeName="opacity"
                values="0.5;0.8;0.5"
                dur={`${10 + i * 2}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={`${10 + i * 20}%`}
              cy={`${20 + (i % 3) * 30}%`}
              r="12"
              fill="none"
              stroke={`rgba(${100 + i * 30}, ${150 + i * 20}, 255, 0.4)`}
              strokeWidth="1"
            >
              <animate
                attributeName="r"
                values="12;14;12"
                dur={`${5 + i}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
        
        {/* Starships */}
        {[...Array(3)].map((_, i) => (
          <path
            key={`ship-${i}`}
            d="M0,0 L10,5 L0,10 L2,5 Z"
            fill="rgba(200, 220, 255, 0.8)"
            transform={`translate(${-20 + i * 10}, ${30 + i * 20}) scale(2)`}
          >
            <animateMotion
              path="M0,0 H100%"
              dur={`${20 + i * 5}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
        
        {/* Horizontal scanning lines */}
        {[...Array(3)].map((_, i) => (
          <line
            key={`scan-${i}`}
            x1="0"
            y1={`${30 + i * 20}%`}
            x2="100%"
            y2={`${30 + i * 20}%`}
            stroke="rgba(100, 200, 255, 0.6)"
            strokeWidth="0.5"
            strokeDasharray="10,10"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;100"
              dur={`${15 + i * 5}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
        
        {/* Pulsating glow */}
        <circle cx="50%" cy="50%" r="40%" fill="url(#glow)">
          <animate
            attributeName="opacity"
            values="0.2;0.4;0.2"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Random blinking stars */}
        {[...Array(50)].map((_, i) => (
          <circle
            key={`star-${i}`}
            cx={`${Math.random() * 100}%`}
            cy={`${Math.random() * 100}%`}
            r="1"
            fill="rgba(255, 255, 255, 0.8)"
          >
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur={`${Math.random() * 3 + 2}s`}
              repeatCount="indefinite"
              begin={`${Math.random() * 5}s`}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default RobotTransformerWallpaper;
