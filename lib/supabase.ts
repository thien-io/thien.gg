import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      guestbook: {
        Row: {
          id: number;
          name: string;
          message: string;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          message: string;
          avatar_url?: string | null;
        };
      };
    };
  };
};
