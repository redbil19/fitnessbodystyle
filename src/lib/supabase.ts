import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any = null;
let initError: Error | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase initialized');
  } catch (error: any) {
    initError = error;
    console.error('❌ Supabase error:', error);
  }
} else {
  console.warn('⚠️ Supabase credentials not set');
}

export { supabase, initError };