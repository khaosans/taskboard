"use client"

import React from 'react'
import { Button } from '@/components/ui/button'

interface GoogleDriveAuthProps {
  onConnect: () => void
}

const GoogleDriveAuth: React.FC<GoogleDriveAuthProps> = ({ onConnect }) => {
  const handleAuth = async () => {
    try {
      const response = await fetch('/api/auth/callback?action=google-drive-login');
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error initiating Google Drive auth:', error);
    }
  };

  return (
    <Button onClick={handleAuth}>Connect Google Drive</Button>
  );
};

export default GoogleDriveAuth;
