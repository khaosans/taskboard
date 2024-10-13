import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

// Use a type assertion for the environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Type definitions
export type ServerSupabaseClient = SupabaseClient;
export type ClerkSupabaseClient = SupabaseClient;
export type CreateServerSupabaseClient = () => ServerSupabaseClient;
export type CreateClerkSupabaseClient = () => Promise<ClerkSupabaseClient>;

// Client-side Supabase client
export const createClientSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Placeholder for server-side functions
export let createServerSupabaseClient: CreateServerSupabaseClient = () => {
  throw new Error('createServerSupabaseClient is only available on the server');
};

export let createClerkSupabaseClient: CreateClerkSupabaseClient = async () => {
  throw new Error('createClerkSupabaseClient is only available on the server');
};

// Server-side implementations
if (typeof window === 'undefined') {
  const { createServerClient } = require("@supabase/ssr");
  const { cookies } = require("next/headers");
  const { auth } = require('@clerk/nextjs');

  createServerSupabaseClient = () => {
    const cookieStore = cookies();
    return createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: any) => cookieStore.set({ name, value, ...options }),
        remove: (name: string, options: any) => cookieStore.set({ name, value: '', ...options }),
      },
    });
  };

  createClerkSupabaseClient = async () => {
    const { getToken } = auth();
    const supabaseAccessToken = await getToken({ template: 'supabase' });

    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    });
  };
}

// Helper function to create a Clerk-authenticated Supabase client (client-side)
export function createClerkSupabaseClientHelper(getToken: () => Promise<string | null>) {
  return async () => {
    const token = await getToken();
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  };
}

export { createClient };
