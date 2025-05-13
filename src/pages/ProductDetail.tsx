
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductById, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Review } from "@/components/product/ReviewsList";
import Breadcrumb from "@/components/product/Breadcrumb";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      username: "Sarah Johnson",
      date: "2025-04-15",
      rating: 5,
      comment: "I absolutely love this handmade item! The craftsmanship is exceptional and it looks even better in person."
    },
    {
      id: 2,
      username: "Michael Chen",
      date: "2025-04-10",
      rating: 4,
      comment: "Great quality and fast shipping. Would definitely purchase from this shop again."
    }
  ]);
  
  // Convert ID to number and get product
  const productId = parseInt(id || "0");
  const product = getProductById(productId);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-16 flex flex-col items-center justify-center flex-grow">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">Sorry, we couldn't find the product you're looking for.</p>
          <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Calculate average rating from product rating and reviews
  const allRatings = [product.rating, ...reviews.map(r => r.rating)];
  const averageRating = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container py-8">
        {/* Breadcrumb */}
        <Breadcrumb productName={product.title} />
        
        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="aspect-square bg-muted/20 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <ProductInfo 
            product={product} 
            averageRating={averageRating} 
            reviewsCount={reviews.length + 1} 
          />
        </div>
        
        {/* Product Tabs */}
        <ProductTabs reviews={reviews} product={product} />
        
        {/* Related Products */}
        <RelatedProducts 
          currentProductId={product.id} 
          products={products} 
          category={product.category} 
        />
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProductDetail;
