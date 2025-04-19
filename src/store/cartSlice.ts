import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  product_id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

// Helper function to transform cart item data
const transformCartItem = (item: any): CartItem => {
  return {
    id: item.id,
    product_id: item.product_id,
    name: item.product?.name || 'Unknown Product',
    image: item.product?.image_url || '/placeholder-image.jpg',
    price: item.product?.price || 0,
    quantity: item.quantity || 1,
    stock: item.product?.stock || 0,
  };
};

// Fetch cart items from Supabase
export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching cart items...');
      
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('User error:', userError);
        throw new Error('Authentication error');
      }
      
      if (!user) {
        console.error('No authenticated user');
        throw new Error('User not authenticated');
      }
      
      // Get the user's cart
      const { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();
        
      console.log('Cart found:', cart, 'Error:', cartError);
        
      if (cartError) {
        if (cartError.code === 'PGRST116') {
          // Cart doesn't exist, return empty array
          console.log('No cart found, returning empty array');
          return [];
        }
        throw cartError;
      }
      
      if (!cart) {
        console.log('No cart found, returning empty array');
        return [];
      }
      
      // Get cart items with product details
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          cart_id,
          product_id,
          quantity,
          created_at,
          product:products (
            id,
            name,
            image_url,
            price,
            stock
          )
        `)
        .eq('cart_id', cart.id)
        .order('created_at');

      if (error) {
        console.error('Error fetching cart items:', error);
        throw error;
      }
      
      console.log('Cart items fetched:', cartItems);
      return cartItems || [];
    } catch (error: any) {
      console.error('Error in fetchCartItems:', error);
      return rejectWithValue(error.message || 'Failed to fetch cart items');
    }
  }
);

// Add item to cart in Supabase
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ product_id, quantity }: { product_id: string; quantity: number }, { rejectWithValue }) => {
    try {
      console.log('Adding to cart:', { product_id, quantity });
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('Auth error:', userError);
        throw new Error('User not authenticated');
      }

      // Get the user's cart
      let { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();

      console.log('Existing cart:', cart, 'Error:', cartError);

      // If cart doesn't exist, create one
      if (cartError && cartError.code === 'PGRST116') {
        console.log('Creating new cart for user:', user.id);
        const { data: newCart, error: createError } = await supabase
          .from('carts')
          .insert([{ user_id: user.id }])
          .select()
          .single();

        if (createError) {
          console.error('Error creating cart:', createError);
          throw createError;
        }
        if (!newCart) throw new Error('Failed to create cart');
        cart = newCart;
        console.log('New cart created:', cart);
      } else if (cartError) {
        console.error('Error fetching cart:', cartError);
        throw cartError;
      }

      if (!cart) {
        throw new Error('Cart not found');
      }

      // Get product details
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('id', product_id)
        .single();

      if (productError) {
        console.error('Error fetching product:', productError);
        throw productError;
      }
      if (!product) throw new Error('Product not found');
      console.log('Product found:', product);

      // Check if item already exists in cart
      const { data: existingItem, error: itemError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cart.id)
        .eq('product_id', product_id)
        .single();

      console.log('Existing cart item:', existingItem, 'Error:', itemError);

      let cartItem;

      if (existingItem) {
        // Update existing item
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          throw new Error('Not enough stock available');
        }

        const { data: updatedItem, error: updateError } = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('id', existingItem.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error updating cart item:', updateError);
          throw updateError;
        }
        cartItem = updatedItem;
        console.log('Updated cart item:', cartItem);
      } else {
        // Add new item
        if (quantity > product.stock) {
          throw new Error('Not enough stock available');
        }

        const { data: newItem, error: insertError } = await supabase
          .from('cart_items')
          .insert([{
            cart_id: cart.id,
            product_id,
            quantity
          }])
          .select()
          .single();

        if (insertError) {
          console.error('Error inserting cart item:', insertError);
          throw insertError;
        }
        cartItem = newItem;
        console.log('New cart item created:', cartItem);
      }

      return {
        id: cartItem.id,
        product_id: cartItem.product_id,
        name: product.name,
        image: product.image_url,
        price: product.price,
        quantity: cartItem.quantity,
        stock: product.stock
      };
    } catch (error: any) {
      console.error('Error in addToCart:', error);
      return rejectWithValue(error.message || 'Failed to add item to cart');
    }
  }
);

// Remove item from cart in Supabase
export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (itemId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      return itemId;
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      return rejectWithValue(error.message || 'Failed to remove item from cart');
    }
  }
);

// Clear cart in Supabase
export const clearCartItems = createAsyncThunk(
  'cart/clearItems',
  async (_, { rejectWithValue }) => {
    try {
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('User not authenticated');
      }
      
      // Get the user's cart
      const { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();
        
      if (cartError || !cart) {
        return;
      }
      
      // Delete all cart items
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id);

      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      return rejectWithValue(error.message || 'Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartPrices: (state) => {
      state.itemsPrice = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
      state.totalPrice = state.itemsPrice + state.shippingPrice;
    },
    clearCart: (state) => {
      state.items = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map(transformCartItem);
        cartSlice.caseReducers.updateCartPrices(state);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error('Failed to fetch cart items');
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItem = state.items.find(
          (item) => item.product_id === action.payload.product_id
        );
        
        if (existingItem) {
          existingItem.quantity = action.payload.quantity;
        } else {
          state.items.push(transformCartItem(action.payload));
        }
        cartSlice.caseReducers.updateCartPrices(state);
        toast.success('Item added to cart');
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload as string;
        toast.error('Failed to add item to cart');
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        cartSlice.caseReducers.updateCartPrices(state);
        toast.success('Item removed from cart');
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload as string;
        toast.error('Failed to remove item from cart');
      })
      .addCase(clearCartItems.fulfilled, (state) => {
        state.items = [];
        state.itemsPrice = 0;
        state.shippingPrice = 0;
        state.totalPrice = 0;
        toast.success('Cart cleared');
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        state.error = action.payload as string;
        toast.error('Failed to clear cart');
      });
  },
});

export const { updateCartPrices, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 