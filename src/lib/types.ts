// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  address?: Address;
  wishlist?: string[];
  createdAt: Date;
}

export interface Address {
  line1: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  tags: string[];
  images: string[];
  rating: number;
  numReviews: number;
  reviews: Review[];
  createdAt: Date;
}

export interface Review {
  userId: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Cart Types
export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Cart {
  id?: string;
  userId?: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt: Date;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  orderItems: CartItem[];
  shippingAddress: Address;
  paymentMethod: "COD" | "Online";
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  createdAt: Date;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}