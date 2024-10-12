import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

console.log('Supabase URL:', SUPABASE_URL); // Debug log
console.log('Supabase Anon Key:', SUPABASE_ANON_KEY); // Debug log

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;