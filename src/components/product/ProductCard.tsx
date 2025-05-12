import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: 'Added to wishlist',
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden group transition-all duration-300 hover:shadow-md">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <Button
            onClick={handleAddToWishlist}
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 opacity-80 hover:opacity-100 shadow-sm"
          >
            <Heart className="h-4 w-4 text-[#D36C3F]" />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground line-clamp-1">{product.name}</h3>
          <div className="flex items-center mt-1">
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
          <p className="font-semibold mt-2 text-lg">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#708238] hover:bg-[#5a6a2e] text-white"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;