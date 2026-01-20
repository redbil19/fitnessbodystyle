import { createClient } from "@supabase/supabase-js";

// Get from environment variables or use hardcoded values as fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://qtyvowueqecmugxkyyqv.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_AqbR9NqliW5nO2AAzTpHUA_4oaX5KFd";

// Log for debugging
if (typeof window !== 'undefined') {
  console.log('=== SUPABASE CONFIG ===');
  console.log('URL present:', !!supabaseUrl);
  console.log('Key present:', !!supabaseAnonKey);
  console.log('URL value:', supabaseUrl);
  console.log('======================');
}

let supabase: any = null;

// Only create client if both URL and key are present
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
  }
}

export { supabase };