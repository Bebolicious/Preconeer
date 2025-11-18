import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your actual Supabase credentials
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'YOUR_SUPABASE_URL') {
  console.error('Supabase credentials missing or not configured');
  throw new Error('Please update the Supabase credentials in src/lib/supabase.ts');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Card = {
  id: number;
  uuid: string;
  scryfall_id: string;
  name: string;
  set: string;
  image_url: string;
  type_line: string;
  oracle_text: string;
  created_at: string;
};
