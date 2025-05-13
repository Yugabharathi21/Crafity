
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDescription from "./ProductDescription";
import ProductShipping from "./ProductShipping";
import ReviewsTab from "./ReviewsTab";
import { Review } from "./ReviewsList";
import { CraftItem } from "@/components/CraftCard";

interface ProductTabsProps {
  reviews: Review[];
  product: CraftItem;
}

const ProductTabs = ({ reviews, product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("description");
  
  return (
    <Tabs defaultValue="description" onValueChange={setActiveTab} className="mb-12">
      <TabsList className="w-full border-b rounded-none justify-start h-auto bg-transparent mb-6 gap-4">
        <TabsTrigger 
          value="description" 
          className={`pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none ${
            activeTab === "description" ? "border-b-2 border-primary" : ""
          }`}
        >
          Description
        </TabsTrigger>
        <TabsTrigger 
          value="reviews" 
          className={`pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none ${
            activeTab === "reviews" ? "border-b-2 border-primary" : ""
          }`}
        >
          Reviews ({reviews.length + 1})
        </TabsTrigger>
        <TabsTrigger 
          value="shipping" 
          className={`pb-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none ${
            activeTab === "shipping" ? "border-b-2 border-primary" : ""
          }`}
        >
          Shipping & Returns
        </TabsTrigger>
      </TabsList>
      
      <ProductDescription />
      <ReviewsTab initialReviews={reviews} product={product} />
      <ProductShipping />
    </Tabs>
  );
};

export default ProductTabs;
