'use client';

import React from 'react';
import Link from 'next/link';
import SharedLayout from '../../components/SharedLayout';

const HomePage: React.FC = () => {
  return (
    <SharedLayout>
      <h1 className="text-3xl font-bold mb-4">Welcome to Our App</h1>
      <div className="flex space-x-4">
        <Link href="/tasks">
          <a className="text-blue-500 hover:underline">Go to Tasks</a>
        </Link>
        <Link href="/agent-design">
          <a className="text-blue-500 hover:underline">Agent Design</a>
        </Link>
        <Link href="/task-agent-analytics">
          <a className="text-blue-500 hover:underline">Task Agent Analytics</a>
        </Link>
      </div>
    </SharedLayout>
  );
};

export default HomePage;