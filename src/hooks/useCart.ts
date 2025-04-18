import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import type { CartItem } from '../store/types';

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = useSelector((state: RootState) => state.cart.total);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const removeItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const clearAllItems = () => {
    dispatch(clearCart());
  };

  return {
    items: cartItems,
    total: cartTotal,
    addItem,
    removeItem,
    updateItemQuantity,
    clearAllItems,
  };
};

export default useCart; 