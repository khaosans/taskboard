import { useState, useEffect } from 'react';
import logger from '@/lib/logger';
import kvClient from '@/lib/kvClient';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  createdAt: string;
  // Add other properties as needed
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const notifs = await kvClient.get<Notification[]>('notifications');
      setNotifications(notifs || []);
    } catch (error) {
      logger.error(`Error fetching notifications: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return { notifications, fetchNotifications };
}
