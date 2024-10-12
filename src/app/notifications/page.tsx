'use client';

import React from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NotificationsPage = () => {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {notifications.map((notification) => (
        <Card key={notification.id} className="mb-4">
          <CardHeader>
            <CardTitle className={notification.read ? 'text-gray-500' : 'text-white'}>
              {notification.message}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
            {!notification.read && (
              <Button
                onClick={() => markAsRead(notification.id)}
                className="mt-2"
                variant="outline"
              >
                Mark as Read
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotificationsPage;