import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ data });
}