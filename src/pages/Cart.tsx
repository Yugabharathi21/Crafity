import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  Plus, 
  Minus, 
  RefreshCw 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { getProducts } from '@/lib/data';
import { Product } from '@/lib/types';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const allProducts = getProducts();

  // Helper function to get product details
  const getProductDetails = (productId: string): Product | undefined => {
    return allProducts.find(p => p.id === productId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

      {cart.items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.items.map((item) => {
                const product = getProductDetails(item.productId);
                const stock = product?.stock || 0;
                
                return (
                  <div key={item.productId} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg bg-background">
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <Link 
                            to={`/product/${item.productId}`}
                            className="text-lg font-medium text-foreground hover:text-[#708238] transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={item.quantity <= 1}
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="h-8 w-8 rounded-r-none"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="w-10 text-center text-sm">
                              {item.quantity}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={item.quantity >= stock}
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="h-8 w-8 rounded-l-none"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.productId)}
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Item Total */}
                      <div className="mt-4 flex justify-between items-center">
                        {stock < 5 && (
                          <p className="text-xs text-amber-500">
                            Only {stock} left in stock
                          </p>
                        )}
                        <p className="text-base font-semibold ml-auto">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0">
              <Button 
                variant="outline" 
                className="space-x-2 w-full sm:w-auto"
                asChild
              >
                <Link to="/shop">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
              
              <Button
                variant="outline"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 w-full sm:w-auto"
                onClick={() => cart.items.forEach(item => removeFromCart(item.productId))}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 bg-background sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cart.totalItems} items)</span>
                  <span className="font-medium">${cart.totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {cart.totalPrice >= 50 ? (
                      <span className="text-green-500">Free</span>
                    ) : (
                      `$${4.99.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">${(cart.totalPrice * 0.07).toFixed(2)}</span>
                </div>
                
                <Separator className="my-3" />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    ${(
                      cart.totalPrice + 
                      (cart.totalPrice >= 50 ? 0 : 4.99) + 
                      (cart.totalPrice * 0.07)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-[#708238] hover:bg-[#5a6a2e] text-white"
                size="lg"
                asChild
              >
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              {/* Shipping Notice */}
              <div className="mt-6 text-sm text-muted-foreground">
                <p className="flex items-center">
                  <ShoppingBag className="h-4 w-4 mr-2 text-[#708238]" />
                  Free shipping on orders over $50
                </p>
                <p className="mt-2">
                  Need help? <Link to="/contact" className="text-[#708238] hover:underline">Contact us</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg bg-background">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button 
            className="bg-[#708238] hover:bg-[#5a6a2e] text-white"
            size="lg"
            asChild
          >
            <Link to="/shop">
              Start Shopping
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;