import { createClient } from '@supabase/supabase-js';

// Get the URL and anon key from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials. Please add them in the Supabase integration settings.');
  throw new Error('Supabase credentials are required. Please configure them in the Supabase integration settings.');
}

// Only create client if we have valid credentials
export const supabase = createClient(supabaseUrl, supabaseKey);