import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Create a function to get the Supabase client
export function getSupabaseClient() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Create a Clerk-authenticated Supabase client
export async function createClerkSupabaseClient() {
  const { getToken } = auth();
  const supabaseAccessToken = await getToken({ template: 'supabase' });

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });
}

// Export the createClient function for cases where a new client is needed
export { createClient };
