export interface CartItem {
  id: string;
  product_id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

export interface CartState {
  items: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  cart: CartState;
} 