
import { useState } from "react";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Review } from "./ReviewsList";

interface ReviewFormProps {
  onSubmit: (review: Omit<Review, "id">) => void;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      toast.error("Please fill in all fields");
      return;
    }
    
    onSubmit({
      username: reviewName,
      date: new Date().toISOString().split("T")[0],
      rating: reviewRating,
      comment: reviewComment
    });
    
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddReview} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input 
              id="name" 
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setReviewRating(star)}
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= reviewRating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea 
              id="comment"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your thoughts about this product"
              rows={4}
              required
            />
          </div>
          
          <Button type="submit">Submit Review</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
