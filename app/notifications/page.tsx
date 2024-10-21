'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';

const NotificationsPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`notifications-page ${theme}`}>
      <h1>Notifications</h1>
      {/* Add your notifications content here */}
    </div>
  );
};

export default NotificationsPage;
