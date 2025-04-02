import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController.js';

const router = express.Router();

router.route('/')
  .get(protect, getCart)
  .post(protect, addToCart)
  .delete(protect, clearCart);

router.route('/:id')
  .put(protect, updateCartItem)
  .delete(protect, removeFromCart);

export default router; 