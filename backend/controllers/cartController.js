import asyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate('items.product');
  
  if (!cart) {
    return res.json({ items: [], total: 0 });
  }
  
  res.json(cart);
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [{ product: productId, quantity }]
    });
  } else {
    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }

  await cart.save();
  await cart.populate('items.product');
  
  res.status(201).json(cart);
});

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const cartItem = cart.items.find(
    item => item.product.toString() === req.params.id
  );

  if (!cartItem) {
    res.status(404);
    throw new Error('Item not found in cart');
  }

  cartItem.quantity = quantity;
  await cart.save();
  await cart.populate('items.product');
  
  res.json(cart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
export const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  cart.items = cart.items.filter(
    item => item.product.toString() !== req.params.id
  );

  await cart.save();
  await cart.populate('items.product');
  
  res.json(cart);
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.json({ message: 'Cart cleared' });
}); 