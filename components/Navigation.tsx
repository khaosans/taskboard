'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function Navigation() {
  const { isSignedIn, user } = useUser();

  return (
    <nav>
      <Link href="/">Quantum Labs</Link>
      <Link href="/portfolio">Portfolio</Link>
      <Link href="/defi-dashboard">Defi-dashboard</Link>
      {isSignedIn ? (
        <span>Welcome, {user.firstName}!</span>
      ) : (
        <Link href="/sign-in">Connect Wallet</Link>
      )}
    </nav>
  );
}
