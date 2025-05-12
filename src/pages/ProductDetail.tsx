import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Truck, 
  ShieldCheck, 
  Star, 
  Minus, 
  Plus, 
  Heart, 
  ShoppingCart,
  ChevronRight,
  Share2,
  Check,
  Info,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getProduct } from '@/lib/data';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import ProductCard from '@/components/product/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const productData = getProduct(id);
      if (productData) {
        setProduct(productData);
      }
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: 'Added to cart',
        description: `${product.name} × ${quantity} has been added to your cart.`,
      });
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      toast({
        title: 'Added to wishlist',
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#708238]"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Product Not Found</h1>
          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild className="mt-6 bg-[#708238] hover:bg-[#5a6a2e]">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link 
          to={`/shop/category/${product.category.toLowerCase()}`} 
          className="hover:text-foreground transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-background">
            <AspectRatio ratio={1 / 1}>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>
          
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative overflow-hidden rounded border bg-background flex-1 max-w-[100px] aspect-square ${
                  selectedImage === index ? 'ring-2 ring-[#708238]' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.numReviews} reviews)
                </span>
              </div>
              <Separator orientation="vertical" className="h-5" />
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">In Stock</span>
              </div>
            </div>
          </div>

          <div className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</div>
          
          <p className="text-muted-foreground">{product.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs capitalize">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Separator />
          
          {/* Quantity Selector */}
          <div className="space-y-2">
            <div className="font-medium">Quantity</div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={quantity >= product.stock}
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">{product.stock}</span> available
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 bg-[#708238] hover:bg-[#5a6a2e] text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={handleAddToWishlist}
            >
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>
          
          {/* Shipping & Returns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start space-x-3">
              <Truck className="h-5 w-5 text-[#708238] mt-0.5" />
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ShieldCheck className="h-5 w-5 text-[#708238] mt-0.5" />
              <div>
                <p className="font-medium text-sm">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">Satisfaction guaranteed</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-[#708238] mt-0.5" />
              <div>
                <p className="font-medium text-sm">Authentic Artisan Product</p>
                <p className="text-xs text-muted-foreground">Handcrafted with care</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-[#708238] mt-0.5" />
              <div>
                <p className="font-medium text-sm">Made to Order</p>
                <p className="text-xs text-muted-foreground">Ships in 1-2 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="w-full grid grid-cols-3 max-w-3xl mx-auto">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          <div className="mt-8">
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">About This Product</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {product.description}
                  </p>
                  
                  <h4 className="font-semibold mt-6 mb-2">Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Handcrafted by skilled artisans</li>
                    <li>Made with sustainable materials</li>
                    <li>Unique design, no two pieces exactly alike</li>
                    <li>Supports traditional craftsmanship</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 py-2 border-b">
                      <span className="font-medium">Category</span>
                      <span>{product.category}</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b">
                      <span className="font-medium">Material</span>
                      <span>Natural & Sustainable</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b">
                      <span className="font-medium">Origin</span>
                      <span>Handcrafted in USA</span>
                    </div>
                    <div className="grid grid-cols-2 py-2 border-b">
                      <span className="font-medium">Care</span>
                      <span>Gentle hand wash only</span>
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible className="mt-6">
                    <AccordionItem value="care-instructions">
                      <AccordionTrigger>Care Instructions</AccordionTrigger>
                      <AccordionContent>
                        Gently hand wash with mild soap and warm water. Air dry completely. 
                        Avoid direct sunlight and harsh chemicals to preserve the natural beauty.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="artisan-info">
                      <AccordionTrigger>Artisan Information</AccordionTrigger>
                      <AccordionContent>
                        This item is handcrafted by skilled artisans who have perfected their craft 
                        over generations. Each piece is unique and tells a story of traditional craftsmanship.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Button className="bg-[#708238] hover:bg-[#5a6a2e] text-white">Write a Review</Button>
                </div>
                
                <div className="space-y-6">
                  {product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                      <div key={index} className="border-b pb-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <Avatar>
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(review.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-muted-foreground">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping">
              <div className="max-w-3xl mx-auto space-y-6">
                <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div className="bg-[#f5f5dc]/30 p-4 rounded-lg">
                    <h4 className="font-semibold flex items-center">
                      <Truck className="h-5 w-5 mr-2 text-[#708238]" />
                      Shipping Policy
                    </h4>
                    <p className="mt-2 text-muted-foreground">
                      All orders are processed within 2-3 business days. Orders are not shipped on weekends or holidays.
                      If we are experiencing a high volume of orders, shipments may be delayed by a few days.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Shipping Rates & Delivery Times</h4>
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Shipping Method
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Delivery Time
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Cost
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-background divide-y divide-border">
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">Standard Shipping</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">5-7 business days</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">$4.99 (Free on orders over $50)</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">Express Shipping</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">2-3 business days</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">$12.99</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">Overnight Shipping</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">1 business day</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">$24.99</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-8 mb-4">Returns & Exchanges</h3>
                  <div className="bg-[#f5f5dc]/30 p-4 rounded-lg">
                    <h4 className="font-semibold flex items-center">
                      <ShieldCheck className="h-5 w-5 mr-2 text-[#708238]" />
                      30-Day Return Policy
                    </h4>
                    <p className="mt-2 text-muted-foreground">
                      We offer a 30-day return policy for most items. To be eligible for a return, your item must be unused 
                      and in the same condition that you received it. It must also be in the original packaging.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      {/* You May Also Like */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* In a real app, fetch related products based on category or tags */}
          {[...Array(4)].map((_, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;