import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: Request) {
  const { userId, message } = await req.json();

  const { data, error } = await supabase
    .from('notifications')
    .insert([
      { userId, message, read: false }
    ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}