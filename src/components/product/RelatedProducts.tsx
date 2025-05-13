
import { Button } from "@/components/ui/button";
import CraftCard, { CraftItem } from "@/components/CraftCard";
import { useNavigate } from "react-router-dom";

interface RelatedProductsProps {
  currentProductId: number;
  products: CraftItem[];
  category: string;
}

const RelatedProducts = ({ currentProductId, products, category }: RelatedProductsProps) => {
  const navigate = useNavigate();
  
  const relatedProducts = products
    .filter(p => p.id !== currentProductId && p.category === category)
    .slice(0, 4);
  
  if (relatedProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((relatedProduct) => (
          <Button 
            key={relatedProduct.id}
            variant="ghost"
            className="p-0 h-auto block"
            onClick={() => navigate(`/product/${relatedProduct.id}`)}
          >
            <CraftCard craft={relatedProduct} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
