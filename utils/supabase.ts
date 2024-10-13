import { createClient } from '@supabase/supabase-js';
import { Session } from '@clerk/nextjs/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

console.log('Supabase URL:', SUPABASE_URL); // Debug log
console.log('Supabase Anon Key:', SUPABASE_ANON_KEY); // Debug log

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function createClerkSupabaseClient(session: Session | null) {
  if (!session) {
    return supabase;
  }

  const supabaseAccessToken = await session.getToken({ template: 'supabase' });

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });
}
