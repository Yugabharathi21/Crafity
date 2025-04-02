import { supabase } from '../lib/supabase';
import type { CartItem } from '../types/supabase';

export async function addToCart(userId: string, productId: string): Promise<CartItem | null> {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        user_id: userId,
        product_id: productId,
        quantity: 1
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
}

export async function getCartItems(userId: string): Promise<CartItem[]> {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (*)
      `)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
}