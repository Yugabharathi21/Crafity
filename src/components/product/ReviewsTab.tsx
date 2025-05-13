
import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import ReviewsList, { Review } from "./ReviewsList";
import ReviewForm from "./ReviewForm";
import { CraftItem } from "@/components/CraftCard";
import { toast } from "sonner";

interface ReviewsTabProps {
  initialReviews: Review[];
  product: CraftItem;
}

const ReviewsTab = ({ initialReviews, product }: ReviewsTabProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const handleAddReview = (newReview: Omit<Review, "id">) => {
    const reviewWithId = {
      ...newReview,
      id: reviews.length + 1,
    };
    
    setReviews([...reviews, reviewWithId]);
    toast.success("Review submitted successfully!");
  };

  return (
    <TabsContent value="reviews" className="mt-0">
      <div className="space-y-8">
        <ReviewsList reviews={reviews} product={product} />
        <ReviewForm onSubmit={handleAddReview} />
      </div>
    </TabsContent>
  );
};

export default ReviewsTab;
