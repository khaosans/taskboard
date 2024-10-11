'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import DeFiBalance from '@/components/DeFiBalance';

const DefiDashboard: React.FC = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1>DeFi Dashboard</h1>
      {isSignedIn && <DeFiBalance />}
      {/* Add other dashboard components here */}
    </div>
  );
};

export default DefiDashboard;