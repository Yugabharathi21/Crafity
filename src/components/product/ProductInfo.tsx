
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { CraftItem } from "@/components/CraftCard";

interface ProductInfoProps {
  product: CraftItem;
  averageRating: number;
  reviewsCount: number;
}

const ProductInfo = ({ product, averageRating, reviewsCount }: ProductInfoProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart`);
  };
  
  return (
    <div className="flex flex-col">
      <Badge className="w-fit mb-4">{product.category}</Badge>
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(averageRating)
                ? "text-yellow-500 fill-yellow-500"
                : star - 0.5 <= averageRating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm">
          ({averageRating.toFixed(1)}) · {reviewsCount} Reviews
        </span>
      </div>
      
      <div className="text-2xl font-bold text-primary mb-6">${product.price.toFixed(2)}</div>
      
      <p className="text-muted-foreground mb-6">
        This handcrafted {product.title.toLowerCase()} is made with premium materials and attention to detail. 
        Each piece is uniquely made by our skilled artisans, ensuring that you receive a one-of-a-kind item.
      </p>
      
      <div className="flex gap-4 mt-auto">
        <Button onClick={handleAddToCart} className="flex-1" size="lg">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
        <Button variant="outline" size="icon" className="h-12 w-12">
          <Heart className={product.isFavorite ? "fill-crafty-500 text-crafty-500" : ""} />
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
