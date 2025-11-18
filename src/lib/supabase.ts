import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing:', { 
    hasUrl: !!supabaseUrl, 
    hasKey: !!supabaseAnonKey 
  });
  throw new Error('Supabase credentials are not configured. Please check your environment variables.');
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
