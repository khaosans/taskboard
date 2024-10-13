import { NextResponse } from 'next/server';
import { createClerkSupabaseClient } from '@/lib/supabase';

export async function POST(req: Request) {
  const { userId, message } = await req.json();

  const client = await createClerkSupabaseClient();
  const { data, error } = await client
    .from('notifications')
    .insert([
      { userId, message, read: false }
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}