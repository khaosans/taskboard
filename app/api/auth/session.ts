import { NextResponse } from 'next/server';
import supabase from '@/lib/supabaseClient';

export async function GET() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ user: data.session.user });
}
