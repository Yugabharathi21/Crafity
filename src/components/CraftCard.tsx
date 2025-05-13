
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

export interface CraftItem {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  isFavorite?: boolean;
}

interface CraftCardProps {
  craft: CraftItem;
}

const CraftCard = ({ craft }: CraftCardProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the add to cart button
    e.stopPropagation(); // Stop event bubbling
    addToCart(craft);
  };

  return (
    <Card className="craft-card overflow-hidden border border-border/40 h-full glass-card">
      <div className="relative">
        <img
          src={craft.image}
          alt={craft.title}
          className="object-cover w-full aspect-[4/3]"
        />
        <Badge className="absolute top-3 left-3 glass-dark backdrop-blur-sm text-foreground">
          {craft.category}
        </Badge>
        <button className="absolute top-3 right-3 h-8 w-8 rounded-full glass-dark backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-crafty-500 transition-colors">
          <Heart size={18} className={craft.isFavorite ? "fill-crafty-500 text-crafty-500" : ""} />
        </button>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-lg truncate">{craft.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-lg">${craft.price.toFixed(2)}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < craft.rating ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="glass-primary"
          className="w-full gap-2 hover-glow"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CraftCard;
