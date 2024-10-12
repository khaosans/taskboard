import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { notificationStore, Notification } from '@/lib/notificationStore';

export const useNotifications = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const intervalId = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
      return () => clearInterval(intervalId);
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (!user) return;
    
    try {
      const fetchedNotifications = await notificationStore.fetchNotifications(user.id);
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    if (!user) return;

    try {
      await notificationStore.markAsRead(user.id, notificationId);
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return { notifications, markAsRead };
};