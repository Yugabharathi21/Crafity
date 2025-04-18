import asyncHandler from 'express-async-handler';
import { supabase } from '../config/supabaseClient.js';
import logger from '../utils/logger.js';

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  logger.cart(`Fetching cart for user: ${userId}`);

  try {
    // First, get or create the user's cart
    let { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (cartError && cartError.code === 'PGRST116') {
      logger.cart('Cart not found, creating new cart');
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: userId })
        .select()
        .single();

      if (createError) throw createError;
      cart = newCart;
      logger.success('New cart created', cart);
    } else if (cartError) {
      throw cartError;
    }

    // Get cart items with product details
    const { data: cartItems, error: itemsError } = await supabase
      .from('user_cart_details')
      .select('*')
      .eq('cart_id', cart.id);

    if (itemsError) throw itemsError;

    logger.success('Cart fetched successfully', { cart, items: cartItems });
    res.json({
      id: cart.id,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.total_price, 0)
    });
  } catch (error) {
    logger.error('Error fetching cart', error);
    res.status(500);
    throw new Error('Error fetching cart');
  }
});

// @desc    Add item to cart
// @route   POST /api/cart/items
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  logger.cart('Adding item to cart', { userId, productId, quantity });

  try {
    // Get or create cart
    let { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (cartError && cartError.code === 'PGRST116') {
      const { data: newCart, error: createError } = await supabase
        .from('carts')
        .insert({ user_id: userId })
        .select()
        .single();

      if (createError) throw createError;
      cart = newCart;
      logger.success('New cart created for item addition', cart);
    } else if (cartError) {
      throw cartError;
    }

    // Check if item already exists in cart
    const { data: existingItem, error: checkError } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id)
      .eq('product_id', productId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') throw checkError;

    let result;
    if (existingItem) {
      logger.cart('Updating existing cart item', existingItem);
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      logger.cart('Adding new item to cart');
      const { data, error } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cart.id,
          product_id: productId,
          quantity
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    logger.success('Item added to cart successfully', result);
    res.status(201).json(result);
  } catch (error) {
    logger.error('Error adding item to cart', error);
    res.status(500);
    throw new Error('Error adding item to cart');
  }
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/items/:id
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  logger.cart('Updating cart item', { itemId: id, quantity });

  try {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', id)
      .select('*, cart:carts(user_id)')
      .single();

    if (error) throw error;

    // Verify ownership
    if (data.cart.user_id !== userId) {
      logger.error('Unauthorized cart item update attempt', { userId, itemId: id });
      res.status(403);
      throw new Error('Not authorized to update this cart item');
    }

    logger.success('Cart item updated successfully', data);
    res.json(data);
  } catch (error) {
    logger.error('Error updating cart item', error);
    res.status(500);
    throw new Error('Error updating cart item');
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/items/:id
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  logger.cart('Removing item from cart', { itemId: id });

  try {
    // First verify ownership
    const { data: item, error: checkError } = await supabase
      .from('cart_items')
      .select('*, cart:carts(user_id)')
      .eq('id', id)
      .single();

    if (checkError) throw checkError;

    if (item.cart.user_id !== userId) {
      logger.error('Unauthorized cart item removal attempt', { userId, itemId: id });
      res.status(403);
      throw new Error('Not authorized to remove this cart item');
    }

    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    logger.success('Cart item removed successfully', { itemId: id });
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    logger.error('Error removing item from cart', error);
    res.status(500);
    throw new Error('Error removing item from cart');
  }
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  logger.cart('Clearing cart', { userId });

  try {
    const { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (cartError) throw cartError;

    const { error: deleteError } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);

    if (deleteError) throw deleteError;

    logger.success('Cart cleared successfully', { userId });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    logger.error('Error clearing cart', error);
    res.status(500);
    throw new Error('Error clearing cart');
  }
});

export {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
}; 