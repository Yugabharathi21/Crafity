import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Trash2,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { getProducts } from '@/lib/data';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/lib/types';

// In a real app, this would come from an API
const mockWishlistItems = [
  '1', // Product IDs
  '4',
  '6'
];

const Wishlist: React.FC = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const allProducts = getProducts();
  const [wishlistItems, setWishlistItems] = useState<string[]>(mockWishlistItems);
  
  // Get full product details for wishlist items
  const wishlistProducts = allProducts.filter(product => 
    wishlistItems.includes(product.id)
  );

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(id => id !== productId));
    toast({
      title: 'Removed from wishlist',
      description: 'The item has been removed from your wishlist.',
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const addAllToCart = () => {
    wishlistProducts.forEach(product => {
      addToCart(product, 1);
    });
    toast({
      title: 'Items added to cart',
      description: `${wishlistProducts.length} items have been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        
        {wishlistItems.length > 0 && (
          <Button 
            onClick={addAllToCart}
            className="mt-4 md:mt-0 bg-[#708238] hover:bg-[#5a6a2e] text-white"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add All to Cart
          </Button>
        )}
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <div 
              key={product.id} 
              className="border rounded-lg overflow-hidden bg-card group"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 text-red-500 opacity-90 hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <Link 
                  to={`/product/${product.id}`}
                  className="text-lg font-medium hover:text-[#708238] transition-colors line-clamp-1"
                >
                  {product.name}
                </Link>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">({product.numReviews})</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-[#708238] hover:bg-[#5a6a2e] text-white"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg bg-background">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Items added to your wishlist will appear here. Start browsing our collection to find items you love.
          </p>
          <Button 
            className="bg-[#708238] hover:bg-[#5a6a2e] text-white"
            asChild
          >
            <Link to="/shop">
              Discover Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;