
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalItems, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container py-16 min-h-[50vh] flex flex-col items-center justify-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="rounded-lg border">
            <div className="p-4 border-b bg-muted/50">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <h3 className="font-medium">Product</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="font-medium">Price</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="font-medium">Quantity</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="font-medium">Total</h3>
                </div>
              </div>
            </div>
            
            {cart.map((item) => (
              <div key={item.id} className="p-4 border-b last:border-b-0">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex gap-4">
                    <div className="w-16 h-16 rounded overflow-hidden">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-red-500 flex items-center gap-1 mt-1 hover:underline"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border rounded">
                      <button 
                        className="px-2 py-1"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="h-8 w-12 text-center border-0"
                      />
                      <button 
                        className="px-2 py-1"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft size={16} /> Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="rounded-lg border p-6 bg-muted/10 space-y-4">
            <h3 className="text-lg font-bold">Order Summary</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items ({totalItems})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tax included
                </p>
              </div>
            </div>
            
            <Link to="/checkout">
              <Button className="w-full mt-4">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
