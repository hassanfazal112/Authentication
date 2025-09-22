import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error(
    'SUPABASE_URL environment variable is required. Please set it in your .env file.',
  );
}

if (!supabaseKey) {
  throw new Error(
    'SUPABASE_KEY environment variable is required. Please set it in your .env file.',
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
