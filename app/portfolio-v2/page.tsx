'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';

const PortfolioPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`portfolio-page ${theme}`}>
      <h1>Portfolio</h1>
      {/* Add your portfolio content here */}
    </div>
  );
};

export default PortfolioPage;
