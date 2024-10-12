import { NextApiRequest, NextApiResponse } from 'next';

// Mock data for notifications
const mockNotifications = [
    { id: '1', message: 'New task assigned to you', createdAt: new Date().toISOString() },
    { id: '2', message: 'Project deadline approaching', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', message: 'Team meeting scheduled for tomorrow', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export default async function getNotifications(req: NextApiRequest, res: NextApiResponse) {
    // Simulate a delay to mimic API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return mock notifications
    res.status(200).json({ notifications: mockNotifications });
}