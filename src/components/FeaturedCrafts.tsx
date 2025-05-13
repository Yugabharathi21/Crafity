
import CraftCard, { CraftItem } from "@/components/CraftCard";
import { Button } from "@/components/ui/button";

const featuredCrafts: CraftItem[] = [
  {
    id: 1,
    title: "Handwoven Rattan Basket",
    image: "https://images.unsplash.com/photo-1605883705077-8d3d0afda512?q=80&w=1974&auto=format&fit=crop",
    price: 45.99,
    category: "Home Decor",
    rating: 5,
    isFavorite: true
  },
  {
    id: 2,
    title: "Ceramic Plant Pot Set",
    image: "https://images.unsplash.com/photo-1595409194916-7e0da0b3d201?q=80&w=1780&auto=format&fit=crop",
    price: 29.99,
    category: "Ceramics",
    rating: 4,
    isFavorite: false
  },
  {
    id: 3,
    title: "Macramé Wall Hanging",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000&auto=format&fit=crop",
    price: 78.50,
    category: "Textiles",
    rating: 5,
    isFavorite: false
  },
  {
    id: 4,
    title: "Hand-Carved Wooden Box",
    image: "https://images.unsplash.com/photo-1626072778346-0ab6604d39c4?q=80&w=1974&auto=format&fit=crop",
    price: 64.99,
    category: "Woodworking",
    rating: 4,
    isFavorite: true
  }
];

const FeaturedCrafts = () => {
  return (
    <section id="featured" className="py-16 bg-secondary">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Featured Crafts</h2>
            <p className="text-muted-foreground max-w-2xl">
              Handpicked selections from our most talented artisans
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            View All Featured
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCrafts.map((craft) => (
            <CraftCard key={craft.id} craft={craft} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCrafts;
