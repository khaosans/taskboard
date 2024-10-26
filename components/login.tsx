'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    // If login is successful, redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {/* Add your login form fields here */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
