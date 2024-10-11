'use client';

import React from 'react';
import Link from 'next/link';

const Console: React.FC = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Console</h1>
      <div className="space-y-4">
    
        <Link href="/tasks">
          <span className="text-blue-500 hover:underline">Go to Task Manager</span>
        </Link>
        {/* Add more links or content as needed */}
      </div>
    </div>
  );
};

export default Console;