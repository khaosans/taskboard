import { NextResponse } from 'next/server';
import { notificationStore } from '@/lib/notificationStore';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const notifications = await notificationStore.fetchNotifications(userId);
  return NextResponse.json(notifications);
}

export async function POST(req: Request) {
  const { userId, message } = await req.json();

  if (!userId || !message) {
    return NextResponse.json({ error: 'User ID and message are required' }, { status: 400 });
  }

  await notificationStore.addNotification(userId, message);
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const { userId, notificationId } = await req.json();

  if (!userId || !notificationId) {
    return NextResponse.json({ error: 'User ID and notification ID are required' }, { status: 400 });
  }

  await notificationStore.markAsRead(userId, notificationId);
  return NextResponse.json({ success: true });
}