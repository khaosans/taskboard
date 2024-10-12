import { kv } from '@vercel/kv';

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
}

class NotificationStore {
  private notifications: Map<string, Notification[]> = new Map();

  async fetchNotifications(userId: string): Promise<Notification[]> {
    if (!this.notifications.has(userId)) {
      const notifications = await kv.get(`notifications:${userId}`) || [];
      // Ensure the fetched notifications are of type Notification[]
      const typedNotifications = notifications as Notification[];
      this.notifications.set(userId, typedNotifications);
    }
    return this.notifications.get(userId) || [];
  }

  async addNotification(userId: string, message: string): Promise<void> {
    const newNotification: Notification = {
      id: Date.now().toString(),
      userId,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    };

    const notifications = await this.fetchNotifications(userId);
    notifications.unshift(newNotification);
    this.notifications.set(userId, notifications);
    await kv.set(`notifications:${userId}`, notifications);
  }

  async markAsRead(userId: string, notificationId: string): Promise<void> {
    const notifications = await this.fetchNotifications(userId);
    const updatedNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    this.notifications.set(userId, updatedNotifications);
    await kv.set(`notifications:${userId}`, updatedNotifications);
  }
}

export const notificationStore = new NotificationStore();