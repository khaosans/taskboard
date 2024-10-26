import React from 'react';
import './styles/globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your App Name',
  description: 'Description of your app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
