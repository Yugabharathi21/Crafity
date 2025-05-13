
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { CraftItem } from "@/components/CraftCard";

export interface Review {
  id: number;
  username: string;
  date: string;
  rating: number;
  comment: string;
}

interface ReviewsListProps {
  reviews: Review[];
  product: CraftItem;
}

const ReviewsList = ({ reviews, product }: ReviewsListProps) => {
  return (
    <div className="space-y-8">
      {/* System Review */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-base font-medium">Crafity Quality Review</CardTitle>
              <p className="text-sm text-muted-foreground">2025-05-01</p>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= product.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p>Our quality assurance team has verified this product meets our high standards for craftsmanship and materials. Each item is carefully inspected before shipping to ensure you receive only the best handcrafted goods.</p>
        </CardContent>
      </Card>
      
      {/* User Reviews */}
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base font-medium">{review.username}</CardTitle>
                <p className="text-sm text-muted-foreground">{review.date}</p>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReviewsList;
