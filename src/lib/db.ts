
// This is a simplified mock database implementation
// In a production app, this would be replaced with actual database calls
// through an API or service like Supabase, Firebase, etc.

import { useState, useEffect } from "react";

// Type definitions
export interface DBAddress {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
  userId: string;
}

export interface DBOrder {
  id: string;
  date: string;
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
  items: number;
  userId: string;
}

export interface DBWishlistItem {
  id: string;
  productId: number;
  userId: string;
  addedAt: string;
}

export interface DBMessage {
  id: string;
  title: string;
  content: string;
  date: string;
  read: boolean;
  userId: string;
}

export interface DBUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  preferences: {
    orderUpdates: boolean;
    promotions: boolean;
    newsletter: boolean;
  };
}

export interface DBCartItem {
  id: string;
  productId: number;
  quantity: number;
  userId: string;
}

// Mock functions to interact with localStorage as a "database"
// Address functions
export const useAddresses = (userId: string) => {
  const [addresses, setAddresses] = useState<DBAddress[]>([]);
  
  useEffect(() => {
    const storedAddresses = localStorage.getItem(`crafity-addresses-${userId}`);
    if (storedAddresses) {
      try {
        setAddresses(JSON.parse(storedAddresses));
      } catch (e) {
        console.error("Error parsing addresses:", e);
        setAddresses([]);
      }
    } else {
      // Initialize with default addresses if none exist
      const defaultAddresses: DBAddress[] = [
        {
          id: "addr1",
          type: "Home",
          street: "123 Main Street",
          city: "Springfield",
          state: "IL",
          zip: "62701",
          country: "United States",
          isDefault: true,
          userId
        },
        {
          id: "addr2",
          type: "Work",
          street: "456 Corporate Blvd",
          city: "Springfield",
          state: "IL",
          zip: "62704",
          country: "United States",
          isDefault: false,
          userId
        }
      ];
      setAddresses(defaultAddresses);
      localStorage.setItem(`crafity-addresses-${userId}`, JSON.stringify(defaultAddresses));
    }
  }, [userId]);
  
  const addAddress = (address: Omit<DBAddress, "id" | "userId">) => {
    const newAddress: DBAddress = {
      ...address,
      id: `addr${Date.now()}`,
      userId
    };
    
    const updatedAddresses = [...addresses];
    
    // If this is the first address or isDefault is true, set it as default
    if (addresses.length === 0 || address.isDefault) {
      updatedAddresses.forEach(addr => addr.isDefault = false);
    }
    
    setAddresses([...updatedAddresses, newAddress]);
    localStorage.setItem(`crafity-addresses-${userId}`, JSON.stringify([...updatedAddresses, newAddress]));
    return newAddress;
  };
  
  const updateAddress = (id: string, updatedData: Partial<DBAddress>) => {
    const updatedAddresses = addresses.map(addr => {
      if (addr.id === id) {
        return { ...addr, ...updatedData };
      }
      // If we're setting this address as default, unset others
      if (updatedData.isDefault && addr.id !== id) {
        return { ...addr, isDefault: false };
      }
      return addr;
    });
    
    setAddresses(updatedAddresses);
    localStorage.setItem(`crafity-addresses-${userId}`, JSON.stringify(updatedAddresses));
  };
  
  const deleteAddress = (id: string) => {
    const filteredAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(filteredAddresses);
    localStorage.setItem(`crafity-addresses-${userId}`, JSON.stringify(filteredAddresses));
  };
  
  return { addresses, addAddress, updateAddress, deleteAddress };
};

// Order functions
export const useOrders = (userId: string) => {
  const [orders, setOrders] = useState<DBOrder[]>([]);
  
  useEffect(() => {
    const storedOrders = localStorage.getItem(`crafity-orders-${userId}`);
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error("Error parsing orders:", e);
        setOrders([]);
      }
    } else {
      // Initialize with some sample orders
      const sampleOrders: DBOrder[] = [
        {
          id: "CR842951",
          date: "2025-05-01",
          total: 147.97,
          status: "Delivered",
          items: 3,
          userId
        },
        {
          id: "CR159763",
          date: "2025-04-15",
          total: 89.99,
          status: "Shipped",
          items: 1,
          userId
        },
        {
          id: "CR346728",
          date: "2025-03-22",
          total: 54.98,
          status: "Processing",
          items: 2,
          userId
        }
      ];
      setOrders(sampleOrders);
      localStorage.setItem(`crafity-orders-${userId}`, JSON.stringify(sampleOrders));
    }
  }, [userId]);
  
  const addOrder = (order: Omit<DBOrder, "id" | "userId">) => {
    const newOrder: DBOrder = {
      ...order,
      id: `CR${Math.floor(Math.random() * 900000) + 100000}`,
      userId
    };
    
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem(`crafity-orders-${userId}`, JSON.stringify(updatedOrders));
    return newOrder;
  };
  
  return { orders, addOrder };
};

// Wishlist functions
export const useWishlist = (userId: string) => {
  const [wishlistItems, setWishlistItems] = useState<DBWishlistItem[]>([]);
  
  useEffect(() => {
    const storedWishlist = localStorage.getItem(`crafity-wishlist-${userId}`);
    if (storedWishlist) {
      try {
        setWishlistItems(JSON.parse(storedWishlist));
      } catch (e) {
        console.error("Error parsing wishlist:", e);
        setWishlistItems([]);
      }
    } else {
      // Initialize with some sample wishlist items
      const sampleWishlist: DBWishlistItem[] = [
        {
          id: "wish1",
          productId: 1,
          userId,
          addedAt: "2025-04-28"
        },
        {
          id: "wish2",
          productId: 2,
          userId,
          addedAt: "2025-05-01"
        },
        {
          id: "wish3",
          productId: 3,
          userId,
          addedAt: "2025-05-05"
        }
      ];
      setWishlistItems(sampleWishlist);
      localStorage.setItem(`crafity-wishlist-${userId}`, JSON.stringify(sampleWishlist));
    }
  }, [userId]);
  
  const addToWishlist = (productId: number) => {
    const existingItem = wishlistItems.find(item => item.productId === productId);
    if (existingItem) return; // Already in wishlist
    
    const newItem: DBWishlistItem = {
      id: `wish${Date.now()}`,
      productId,
      userId,
      addedAt: new Date().toISOString().split('T')[0]
    };
    
    const updatedWishlist = [...wishlistItems, newItem];
    setWishlistItems(updatedWishlist);
    localStorage.setItem(`crafity-wishlist-${userId}`, JSON.stringify(updatedWishlist));
  };
  
  const removeFromWishlist = (productId: number) => {
    const filteredWishlist = wishlistItems.filter(item => item.productId !== productId);
    setWishlistItems(filteredWishlist);
    localStorage.setItem(`crafity-wishlist-${userId}`, JSON.stringify(filteredWishlist));
  };
  
  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.productId === productId);
  };
  
  return { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist };
};

// Messages functions
export const useMessages = (userId: string) => {
  const [messages, setMessages] = useState<DBMessage[]>([]);
  
  useEffect(() => {
    const storedMessages = localStorage.getItem(`crafity-messages-${userId}`);
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (e) {
        console.error("Error parsing messages:", e);
        setMessages([]);
      }
    } else {
      // Initialize with some sample messages
      const sampleMessages: DBMessage[] = [
        {
          id: "msg1",
          title: "Order Confirmation",
          content: "Your order #CR842951 has been confirmed and is being prepared for shipment.",
          date: "2025-05-01",
          read: true,
          userId
        },
        {
          id: "msg2",
          title: "Welcome to Crafity!",
          content: "Thank you for joining our community of craft enthusiasts. Explore our unique handcrafted items!",
          date: "2025-04-12",
          read: true,
          userId
        },
        {
          id: "msg3",
          title: "Special Discount for You",
          content: "As a valued customer, enjoy 15% off your next purchase with code CRAFT15.",
          date: "2025-05-08",
          read: false,
          userId
        }
      ];
      setMessages(sampleMessages);
      localStorage.setItem(`crafity-messages-${userId}`, JSON.stringify(sampleMessages));
    }
  }, [userId]);
  
  const addMessage = (message: Omit<DBMessage, "id" | "userId" | "read">) => {
    const newMessage: DBMessage = {
      ...message,
      id: `msg${Date.now()}`,
      userId,
      read: false
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem(`crafity-messages-${userId}`, JSON.stringify(updatedMessages));
  };
  
  const markAsRead = (id: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem(`crafity-messages-${userId}`, JSON.stringify(updatedMessages));
  };
  
  const deleteMessage = (id: string) => {
    const filteredMessages = messages.filter(msg => msg.id !== id);
    setMessages(filteredMessages);
    localStorage.setItem(`crafity-messages-${userId}`, JSON.stringify(filteredMessages));
  };
  
  return { messages, addMessage, markAsRead, deleteMessage };
};

// User profile functions
export const useUserProfile = (userId: string) => {
  const [profile, setProfile] = useState<DBUser | null>(null);
  
  useEffect(() => {
    const storedProfile = localStorage.getItem(`crafity-profile-${userId}`);
    if (storedProfile) {
      try {
        setProfile(JSON.parse(storedProfile));
      } catch (e) {
        console.error("Error parsing profile:", e);
        createDefaultProfile();
      }
    } else {
      createDefaultProfile();
    }
    
    function createDefaultProfile() {
      // Get the email from the stored user data
      const storedUser = localStorage.getItem("crafity-user");
      if (!storedUser) return;
      
      const parsedUser = JSON.parse(storedUser);
      
      const defaultProfile: DBUser = {
        id: userId,
        email: parsedUser.email,
        firstName: "John",
        lastName: "Doe",
        preferences: {
          orderUpdates: true,
          promotions: true,
          newsletter: false
        }
      };
      
      setProfile(defaultProfile);
      localStorage.setItem(`crafity-profile-${userId}`, JSON.stringify(defaultProfile));
    }
  }, [userId]);
  
  const updateProfile = (updatedData: Partial<DBUser>) => {
    if (!profile) return;
    
    const updatedProfile = { ...profile, ...updatedData };
    setProfile(updatedProfile);
    localStorage.setItem(`crafity-profile-${userId}`, JSON.stringify(updatedProfile));
  };
  
  return { profile, updateProfile };
};

// Cart functions are already handled by the CartContext, but we can create a hook with the same interface
export const useCart = (userId: string) => {
  const [cartItems, setCartItems] = useState<DBCartItem[]>([]);
  
  useEffect(() => {
    const storedCart = localStorage.getItem(`crafity-db-cart-${userId}`);
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error parsing cart:", e);
        setCartItems([]);
      }
    }
  }, [userId]);
  
  const addToCart = (productId: number) => {
    const existingItem = cartItems.find(item => item.productId === productId);
    
    if (existingItem) {
      const updatedCart = cartItems.map(item => 
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem(`crafity-db-cart-${userId}`, JSON.stringify(updatedCart));
    } else {
      const newItem: DBCartItem = {
        id: `cart${Date.now()}`,
        productId,
        quantity: 1,
        userId
      };
      const updatedCart = [...cartItems, newItem];
      setCartItems(updatedCart);
      localStorage.setItem(`crafity-db-cart-${userId}`, JSON.stringify(updatedCart));
    }
  };
  
  const removeFromCart = (productId: number) => {
    const filteredCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(filteredCart);
    localStorage.setItem(`crafity-db-cart-${userId}`, JSON.stringify(filteredCart));
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem(`crafity-db-cart-${userId}`, JSON.stringify(updatedCart));
  };
  
  return { cartItems, addToCart, removeFromCart, updateQuantity };
};

// Function to generate a user ID
export const getUserId = (): string => {
  const storedUser = localStorage.getItem("crafity-user");
  if (!storedUser) return "";
  
  try {
    const parsedUser = JSON.parse(storedUser);
    return parsedUser.userId || parsedUser.email;
  } catch (e) {
    console.error("Error getting user ID:", e);
    return "";
  }
};
