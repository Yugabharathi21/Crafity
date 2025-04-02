import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { addToCart as addToCartUtil, getCartItems } from '../utils/cart';
import type { CartItem } from '../types/supabase';

export function useCart() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(async (productId: string) => {
    if (!user) {
      setError('Must be logged in to add items to cart');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await addToCartUtil(user.id, productId);
      if (result) {
        setItems(prev => [...prev, result]);
      }
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add item to cart');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const loadCartItems = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const items = await getCartItems(user.id);
      setItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cart items');
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    items,
    loading,
    error,
    addToCart,
    loadCartItems
  };
}