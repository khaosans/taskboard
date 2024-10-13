'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {isSignedIn ? (
        <>
          <Link href="/portfolio">Go to Portfolio</Link>
          <Link href="/coin-graphs">Go to Coin Graphs</Link>
        </>
      ) : (
        <Link href="/login">Sign In</Link>
      )}
    </div>
  );
}
