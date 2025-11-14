import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase credentials
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

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
