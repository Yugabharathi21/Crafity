import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  product_id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  countInStock: number;
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

// Fetch cart items from Supabase
export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(
            name,
            image,
            price,
            count_in_stock
          )
        `)
        .order('created_at');

      if (error) throw error;
      return cartItems;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Add item to cart in Supabase
export const addToCart = createAsyncThunk(
  'cart/addItem',
  async (item: Partial<CartItem>, { rejectWithValue }) => {
    try {
      console.log('Adding to cart:', item);
      
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('User error:', userError);
        throw userError;
      }
      
      if (!user) {
        console.error('No authenticated user');
        throw new Error('User not authenticated');
      }
      
      console.log('User authenticated:', user.id);
      
      // First, get or create the user's cart
      let { data: cart, error: cartError } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', user.id)
        .single();
        
      if (cartError) {
        console.error('Cart error:', cartError);
        
        if (cartError.code === 'PGRST116') {
          // Cart doesn't exist, create one
          console.log('Creating new cart for user');
          const { data: newCart, error: createError } = await supabase
            .from('carts')
            .insert({ user_id: user.id })
            .select()
            .single();
            
          if (createError) {
            console.error('Create cart error:', createError);
            throw createError;
          }
          
          if (!newCart) {
            console.error('Failed to create cart');
            throw new Error('Failed to create cart');
          }
          
          cart = newCart;
          console.log('New cart created:', cart);
        } else {
          throw cartError;
        }
      }
      
      if (!cart) {
        console.error('Cart not found');
        throw new Error('Cart not found');
      }
      
      console.log('Using cart:', cart.id);
      
      // Check if item already exists in cart
      const { data: existingItem, error: checkError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cart.id)
        .eq('product_id', item.product_id)
        .single();
        
      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Check item error:', checkError);
        throw checkError;
      }
      
      let result;
      if (existingItem) {
        // Update existing item
        console.log('Updating existing item:', existingItem.id);
        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + (item.quantity || 1) })
          .eq('id', existingItem.id)
          .select(`
            *,
            product:products(
              name,
              image,
              price,
              count_in_stock
            )
          `)
          .single();
          
        if (error) {
          console.error('Update item error:', error);
          throw error;
        }
        
        result = data;
        console.log('Item updated:', result);
      } else {
        // Add new item
        console.log('Adding new item to cart');
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            cart_id: cart.id,
            product_id: item.product_id,
            quantity: item.quantity || 1
          })
          .select(`
            *,
            product:products(
              name,
              image,
              price,
              count_in_stock
            )
          `)
          .single();
          
        if (error) {
          console.error('Insert item error:', error);
          throw error;
        }
        
        result = data;
        console.log('New item added:', result);
      }
      
      return result;
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
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
        state.items = action.payload.map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
          quantity: item.quantity,
          countInStock: item.product.count_in_stock,
        }));
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
          state.items.push({
            id: action.payload.id,
            product_id: action.payload.product_id,
            name: action.payload.product.name,
            image: action.payload.product.image,
            price: action.payload.product.price,
            quantity: action.payload.quantity,
            countInStock: action.payload.product.count_in_stock
          });
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
      });
  },
});

export const { updateCartPrices, clearCart } = cartSlice.actions;
export default cartSlice.reducer;