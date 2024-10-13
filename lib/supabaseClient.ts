/* eslint-disable no-undef */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const insertToken = async (userId: string, tokens: any) => {
  const { data, error } = await supabase
    .from('google_drive_tokens')
    .insert([{ user_id: userId, tokens }]);

  if (error) {
    console.error('Error inserting token:', error);
    return null;
  }
  return data;
};

export const getTokens = async (userId: string) => {
  const { data, error } = await supabase
    .from('google_drive_tokens')
    .select('tokens')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching tokens:', error);
    return null;
  }
  return data?.tokens;
};

export default supabase;
