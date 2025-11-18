import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your actual Supabase credentials
const supabaseUrl = 'https://yttonbjkuccymzxhxbfs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0dG9uYmprdWNjeW16eGh4YmZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NTk2MDksImV4cCI6MjA3NTMzNTYwOX0.kh2iccqWOGdhjYA7gA9jLHlpaQ8ZPsPoxBJATZvCJLQ';

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
