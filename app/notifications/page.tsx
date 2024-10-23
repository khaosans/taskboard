'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Zap, Shield, Rocket, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper';
import { useWallet } from '@/hooks/useWallet';
import { useUser } from '@clerk/nextjs';
import vercelKVClient from '@/utils/vercelKV';

interface Notification {
  icon: string;
  title: string;
  message: string;
  timestamp: number;
}

const iconMap: { [key: string]: React.ElementType } = {
  Bell, Zap, Shield, Rocket, TrendingUp, TrendingDown, AlertTriangle
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { wallet } = useWallet();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && wallet) {
      fetchNotifications();
    }
  }, [isLoaded, isSignedIn, wallet]);

  const fetchNotifications = async () => {
    if (!user) return;

    const key = `notifications:${user.id}`;
    const storedNotifications: Notification[] = await vercelKVClient.get(key) || [];

    // Filter notifications from the last week
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recentNotifications = storedNotifications.filter(n => n.timestamp > oneWeekAgo);

    setNotifications(recentNotifications);

    // Generate new notifications
    const newNotifications = await generateNotifications();

    // Combine and sort all notifications
    const allNotifications = [...recentNotifications, ...newNotifications]
      .sort((a, b) => b.timestamp - a.timestamp);

    // Keep only the most recent 20 notifications
    const trimmedNotifications = allNotifications.slice(0, 20);

    // Update state and store in Vercel KV
    setNotifications(trimmedNotifications);
    await vercelKVClient.set(key, JSON.stringify(trimmedNotifications));
  };

  const generateNotifications = async (): Promise<Notification[]> => {
    const newNotifications: Notification[] = [];
    let portfolioData, marketData;

    if (typeof window !== 'undefined' && wallet) {
      // Fetch portfolio data
      const portfolioResponse = await window.fetch(`/api/debank/user/total_balance?id=${wallet}`);
      portfolioData = await portfolioResponse.json();

      // Fetch market data
      const marketResponse = await window.fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1');
      marketData = await marketResponse.json();
    }

    // Generate wallet notifications
    if (portfolioData && portfolioData.total_usd_value > 10000) {
      newNotifications.push({
        icon: 'Shield',
        title: "High-Value Wallet Alert",
        message: "Your wallet value exceeds $10,000. Consider reviewing your security measures.",
        timestamp: Date.now()
      });
    }

    // Generate market notifications
    if (marketData) {
      marketData.forEach((coin: any) => {
        if (coin.price_change_percentage_24h > 10) {
          newNotifications.push({
            icon: 'TrendingUp',
            title: `${coin.symbol.toUpperCase()} Surge`,
            message: `${coin.name} has increased by ${coin.price_change_percentage_24h.toFixed(2)}% in the last 24 hours.`,
            timestamp: Date.now()
          });
        } else if (coin.price_change_percentage_24h < -10) {
          newNotifications.push({
            icon: 'TrendingDown',
            title: `${coin.symbol.toUpperCase()} Drop`,
            message: `${coin.name} has decreased by ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}% in the last 24 hours.`,
            timestamp: Date.now()
          });
        }
      });
    }

    return newNotifications;
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <RobotTransformerWallpaper />
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-blue-900/5 to-purple-900/5 text-white font-sans">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Cosmic Transmissions</h1>
          
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => {
                const IconComponent = iconMap[notification.icon];
                return (
                  <Card key={index} className="bg-blue-900/40 text-cyan-100">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
                        {notification.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{notification.message}</p>
                      <p className="text-sm text-cyan-300 mt-2">{new Date(notification.timestamp).toLocaleString()}</p>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card className="bg-blue-900/40 text-cyan-100">
                <CardContent>
                  <p className="text-center py-4">No new notifications at this time.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
