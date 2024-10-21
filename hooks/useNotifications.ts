import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export const useNotifications = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // Perform some action if needed
    }
  }, [user]);

  const markAsRead = async (notificationId: string) => {
    if (!user) return;

    try {
      // Perform some action if needed
    } catch (error) {
      // Handle error if needed
    }
  };

  return { markAsRead };
};