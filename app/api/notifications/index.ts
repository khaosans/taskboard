import { NextRequest, NextResponse } from 'next/server';

// Mock data for notifications
const mockNotifications = [
    { id: '1', message: 'New task assigned to you', createdAt: new Date().toISOString() },
    { id: '2', message: 'Project deadline approaching', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', message: 'Team meeting scheduled for tomorrow', createdAt: new Date(Date.now() - 172800000).toISOString() },
];

export async function GET(req: NextRequest) {
    // Simulate a delay to mimic API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return mock notifications
    return NextResponse.json({ notifications: mockNotifications });
}