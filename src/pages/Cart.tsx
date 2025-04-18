import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Minus, Plus } from 'lucide-react';
import { fetchCartItems, removeFromCart, addToCart } from '../store/slices/cartSlice';
import type { RootState } from '../store/store';
import type { AppDispatch } from '../store/store';
import type { CartItem } from '../store/types';
import { Spinner } from '../components/Spinner';
import toast from 'react-hot-toast';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, itemsPrice, shippingPrice, totalPrice, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleQuantityChange = async (productId: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    
    try {
      await dispatch(addToCart({
        product_id: productId,
        quantity: newQuantity
      })).unwrap();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap();
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Error loading cart</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Link 
          to="/shop" 
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item: CartItem) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-md"
                />
                
                <div className="flex-grow">
                  <Link 
                    to={`/product/${item.product_id}`}
                    className="text-lg font-medium hover:text-primary-600 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  
                  {item.countInStock <= 5 && (
                    <p className="text-sm text-red-600 mt-1">
                      Only {item.countInStock} left in stock
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(item.product_id, item.quantity, -1)}
                      className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors duration-200"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                    </button>
                    <span className="px-4 py-2 text-center min-w-[40px]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.product_id, item.quantity, 1)}
                      className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors duration-200"
                      disabled={item.quantity >= item.countInStock}
                    >
                      <Plus size={16} className={item.quantity >= item.countInStock ? 'text-gray-300' : 'text-gray-600'} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-red-600 hover:text-red-700 transition-colors duration-200"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-primary-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-primary-700 transition-colors duration-200"
            >
              Proceed to Checkout
            </Link>
            
            <Link
              to="/shop"
              className="block w-full text-center text-primary-600 px-6 py-3 mt-4 hover:text-primary-700 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;