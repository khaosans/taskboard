import { NextResponse } from 'next/server';
import { createClerkSupabaseClient } from '@/lib/supabase';

export async function GET() {
  const client = await createClerkSupabaseClient();
    const { data, error } = await client.auth.getSession();

    if (error || !data.session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ user: data.session.user });
}
