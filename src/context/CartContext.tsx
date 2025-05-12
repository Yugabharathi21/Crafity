import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartItem, Product } from '@/lib/types';
import * as api from '@/lib/api';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

type CartContextType = {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'craftify-cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    updatedAt: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from API when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const cartData = await api.getCart();
          setCart({
            ...cartData,
            updatedAt: new Date(cartData.updatedAt),
          });
        } catch (error) {
          console.error('Failed to load cart:', error);
        }
      }
    };

    loadCart();
  }, [user]);

  const addToCart = async (product: Product, quantity: number) => {
    setIsLoading(true);
    try {
      const updatedCart = await api.addToCart(product.id, quantity);
      setCart({
        ...updatedCart,
        updatedAt: new Date(updatedCart.updatedAt),
      });
      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add item to cart.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setIsLoading(true);
    try {
      const updatedCart = await api.removeFromCart(productId);
      setCart({
        ...updatedCart,
        updatedAt: new Date(updatedCart.updatedAt),
      });
      toast({
        title: 'Removed from cart',
        description: 'Item has been removed from your cart.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove item from cart.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const updatedCart = await api.updateCartItem(productId, quantity);
      setCart({
        ...updatedCart,
        updatedAt: new Date(updatedCart.updatedAt),
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update cart.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      await api.clearCart();
      setCart({
        items: [],
        totalItems: 0,
        totalPrice: 0,
        updatedAt: new Date(),
      });
      toast({
        title: 'Cart cleared',
        description: 'All items have been removed from your cart.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear cart.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};