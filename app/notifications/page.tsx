'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, MessageSquare, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'assignment' | 'comment' | 'update';
  content: string;
  project: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'assignment',
      content: 'You have been assigned to the task "Design new logo"',
      project: 'Branding Refresh',
      timestamp: '2023-07-15T10:30:00Z',
      read: false,
    },
    {
      id: '2',
      type: 'comment',
      content: 'Alice commented on your task "Implement login functionality"',
      project: 'User Authentication',
      timestamp: '2023-07-14T15:45:00Z',
      read: true,
    },
    {
      id: '3',
      type: 'update',
      content: 'The project "Backend Development" has been marked as complete',
      project: 'Backend Development',
      timestamp: '2023-07-13T09:15:00Z',
      read: false,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'assignment':
        return <Bell className="h-4 w-4" />;
      case 'comment':
        return <MessageSquare className="h-4 w-4" />;
      case 'update':
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start space-x-4 mb-4 p-4 rounded-lg ${notification.read ? 'bg-secondary' : 'bg-primary/10'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <Avatar>
                  <AvatarFallback>{getIcon(notification.type)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className={`${notification.read ? 'font-normal' : 'font-medium'}`}>{notification.content}</p>
                  <p className="text-sm text-muted-foreground">Project: {notification.project}</p>
                  <p className="text-xs text-muted-foreground">{new Date(notification.timestamp).toLocaleString()}</p>
                </div>
                {!notification.read && (
                  <Badge variant="secondary">New</Badge>
                )}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}