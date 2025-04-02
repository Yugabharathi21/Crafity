import { createClient } from '@supabase/supabase-js';
import { type Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Type exports
export type Profile = Tables<'profiles'>;
export type Product = Tables<'products'>;
export type CartItem = Tables<'cart_items'>;
export type Order = Tables<'orders'>;
export type OrderItem = Tables<'order_items'>;