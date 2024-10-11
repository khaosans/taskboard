'use client';

import React, { useEffect, useState } from 'react';
import { fetchNotifications, markAsRead } from '@/lib/notificationService';
import { Notification } from '@/lib/types'; // Import the Notification type

const NotificationSimulator: React.FC = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	useEffect(() => {
		const loadNotifications = async () => {
			const data = await fetchNotifications();
			setNotifications(data);
		};

		loadNotifications();
	}, []);

	const handleMarkAsRead = async (id: string) => {
		await markAsRead(id);
		setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
	};

	return (
		<div className="notification-simulator">
			<h2>Notifications</h2>
			<ul>
				{notifications.map(notification => (
					<li key={notification.id} className={notification.read ? 'read' : 'unread'}>
						<h3>{notification.title}</h3>
						<p>{notification.message}</p>
						{!notification.read && (
							<button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default NotificationSimulator;