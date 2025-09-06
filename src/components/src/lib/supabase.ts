import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types for our appointments table
export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  scheduled_at: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}