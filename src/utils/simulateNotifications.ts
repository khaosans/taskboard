import { toast } from 'react-hot-toast';

let lastNotificationTime = 0;
const NOTIFICATION_COOLDOWN = 60000; // 1 minute cooldown

const simulateNotification = async (userId: string) => {
  const messages = [
    "New task assigned to you",
    "Project deadline updated",
    "Team meeting scheduled",
    "New comment on your task",
    "Task status changed",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  const currentTime = Date.now();
  if (currentTime - lastNotificationTime < NOTIFICATION_COOLDOWN) {
    console.log('Notification cooldown active, skipping this notification');
    return;
  }

  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, message: randomMessage }),
    });

    if (!response.ok) {
      throw new Error('Failed to simulate notification');
    }

    toast.success(randomMessage, {
      duration: 5000,
      position: 'top-right',
    });
    lastNotificationTime = currentTime;
  } catch (error) {
    console.error('Error simulating notification:', error);
  }
};

export const startNotificationSimulation = (userId: string) => {
  const simulateRandomly = () => {
    const delay = Math.floor(Math.random() * (20 - 3 + 1) + 3) * 60 * 1000; // 3-20 minutes in milliseconds
    setTimeout(() => {
      simulateNotification(userId);
      simulateRandomly(); // Schedule the next simulation
    }, delay);
  };

  simulateRandomly(); // Start the simulation
};