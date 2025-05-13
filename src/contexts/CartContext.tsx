
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { CraftItem } from "@/components/CraftCard";

interface CartItem extends CraftItem {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CraftItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('crafity-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart from localStorage:", e);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('crafity-cart', JSON.stringify(cart));
  }, [cart]);
  
  const addToCart = (item: CraftItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        toast.success(`${item.title} quantity updated in cart`);
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        toast.success(`${item.title} added to cart`);
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };
  
  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(item => item.id === itemId);
      if (itemToRemove) {
        toast.info(`${itemToRemove.title} removed from cart`);
      }
      return prevCart.filter(item => item.id !== itemId);
    });
  };
  
  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
