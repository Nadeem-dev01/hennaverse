import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Lazy-initialized clients to avoid crashes at build time when env vars aren't set
let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

function getSupabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
}

function getSupabaseAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
}

function getServiceRoleKey(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
}

/** Browser/client-side Supabase client */
export function getSupabase(): SupabaseClient {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();

  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    );
  }

  if (!_supabase) {
    _supabase = createClient(url, key);
  }
  return _supabase;
}

/** Server-side admin client (uses service role key when available) */
export function getSupabaseAdmin(): SupabaseClient {
  const url = getSupabaseUrl();
  const key = getServiceRoleKey();

  if (!url || !key) {
    throw new Error(
      'Supabase Admin is not configured. Set SUPABASE_SERVICE_ROLE_KEY in .env.local'
    );
  }

  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(url, key);
  }
  return _supabaseAdmin;
}

/** Check if Supabase is configured (for graceful fallback) */
export function isSupabaseConfigured(): boolean {
  return !!(getSupabaseUrl() && getSupabaseAnonKey());
}

export type Database = {
  public: {
    Tables: {
      designs: {
        Row: {
          id: number;
          title: string;
          description: string;
          country: string;
          style: string;
          occasion: string;
          difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
          image_url: string;
          thumbnail_url: string;
          tags: string[];
          pixabay_id: number | null;
          views: number;
          likes: number;
          photographer: string | null;
          source: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['designs']['Row'], 'id' | 'created_at'>;
      };
      categories: {
        Row: {
          id: number;
          name: string;
          slug: string;
          description: string;
          flag: string;
          design_count: number;
          hero_image: string;
          traditions: string;
          famous_for: string;
          styles: string[];
        };
      };
    };
  };
};
