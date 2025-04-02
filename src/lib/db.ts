import { supabase } from './supabase';
import type { Product, CartItem, Order, OrderItem } from './supabase';

export const db = {
  products: {
    // Get all products
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      return { data, error };
    },

    // Get product by id
    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      return { data, error };
    },

    // Create product
    create: async (product: Omit<Product, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();
      return { data, error };
    },
  },

  cart: {
    // Get user's cart
    getUserCart: async (userId: string) => {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, products(*)')
        .eq('user_id', userId);
      return { data, error };
    },

    // Add item to cart
    addItem: async (item: Omit<CartItem, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('cart_items')
        .insert(item)
        .select()
        .single();
      return { data, error };
    },
  },

  orders: {
    // Create order
    create: async (order: Omit<Order, 'id' | 'created_at'>, items: Omit<OrderItem, 'id' | 'created_at'>[]) => {
      const { data, error } = await supabase
        .from('orders')
        .insert(order)
        .select()
        .single();

      if (data) {
        const orderItems = items.map(item => ({ ...item, order_id: data.id }));
        await supabase.from('order_items').insert(orderItems);
      }

      return { data, error };
    },

    // Get user's orders
    getUserOrders: async (userId: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('user_id', userId);
      return { data, error };
    },
  },
};