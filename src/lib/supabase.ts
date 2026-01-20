import { createClient } from "@supabase/supabase-js";

// Hardcoded values
const supabaseUrl = "https://qtyvowueqecmugxkyyqv.supabase.co";
const supabaseAnonKey = "sb_publishable_AqbR9NqliW5nO2AAzTpHUA_4oaX5KFd";

let supabase: any = null;
let initError: Error | null = null;

// Try to initialize Supabase
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase initialized successfully');
  } else {
    throw new Error('Missing Supabase URL or key');
  }
} catch (error: any) {
  initError = error;
  console.error('❌ Failed to initialize Supabase:', error);
}

export { supabase, initError };