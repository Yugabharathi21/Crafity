import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Filter, 
  SlidersHorizontal,
  X, 
  ChevronDown,
  Search 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose 
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ProductCard from '@/components/product/ProductCard';
import { getProducts, getCategories, getProductsByCategory } from '@/lib/data';
import { Product } from '@/lib/types';

const Shop: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getCategories();

  // Initialize products based on category
  useEffect(() => {
    if (categorySlug) {
      const categoryProducts = getProductsByCategory(categorySlug);
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    } else {
      const allProducts = getProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    }
  }, [categorySlug]);

  // Filter products based on search query and price range
  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [searchQuery, priceRange, products]);

  // Helper function to get current category name
  const getCurrentCategoryName = () => {
    if (!categorySlug) return 'All Products';
    const category = categories.find(c => c.slug === categorySlug);
    return category ? category.name : 'All Products';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {getCurrentCategoryName()}
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse our selection of handcrafted items
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto order-2 sm:order-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader className="mb-6">
                  <div className="flex items-center justify-between">
                    <SheetTitle>Filters</SheetTitle>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                </SheetHeader>

                {/* Filter Options */}
                <div className="space-y-6">
                  {/* Categories */}
                  <Accordion type="single" collapsible defaultValue="categories">
                    <AccordionItem value="categories" className="border-b-0">
                      <AccordionTrigger className="py-2">Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {categories.map(category => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox id={`category-${category.id}`} />
                              <label
                                htmlFor={`category-${category.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Price Range */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Price Range</h3>
                      <div className="text-sm text-muted-foreground">
                        ${priceRange[0]} - ${priceRange[1]}
                      </div>
                    </div>
                    <Slider
                      defaultValue={[0, 200]}
                      max={200}
                      step={1}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mt-6"
                    />
                  </div>

                  <Separator />

                  {/* Apply Filters Button */}
                  <SheetClose asChild>
                    <Button className="w-full bg-[#708238] hover:bg-[#5a6a2e] text-white">
                      Apply Filters
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-80 order-1 sm:order-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort */}
          <div className="w-full sm:w-auto order-3">
            <Button variant="outline" className="w-full sm:w-auto flex items-center justify-between">
              <span>Sort By: Latest</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <SlidersHorizontal className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-muted-foreground text-center mt-1">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;