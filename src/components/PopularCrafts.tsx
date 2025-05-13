
import CraftCard, { CraftItem } from "@/components/CraftCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const popularCrafts: Record<string, CraftItem[]> = {
  all: [
    {
      id: 5,
      title: "Handmade Leather Journal",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop",
      price: 35.00,
      category: "Paper Crafts",
      rating: 5,
      isFavorite: false
    },
    {
      id: 6,
      title: "Artisan Soap Collection",
      image: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=2070&auto=format&fit=crop",
      price: 24.99,
      category: "Bath & Beauty",
      rating: 4,
      isFavorite: true
    },
    {
      id: 7,
      title: "Hand-Knotted Tassel Earrings",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1974&auto=format&fit=crop",
      price: 18.50,
      category: "Jewelry",
      rating: 5,
      isFavorite: false
    },
    {
      id: 8,
      title: "Embroidered Linen Napkins",
      image: "https://images.unsplash.com/photo-1597696929736-6d13bed8e6a8?q=80&w=1974&auto=format&fit=crop",
      price: 42.00,
      category: "Textiles",
      rating: 4,
      isFavorite: false
    },
  ],
  jewelry: [
    {
      id: 7,
      title: "Hand-Knotted Tassel Earrings",
      image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1974&auto=format&fit=crop",
      price: 18.50,
      category: "Jewelry",
      rating: 5,
      isFavorite: false
    },
    {
      id: 9,
      title: "Sterling Silver Chain Bracelet",
      image: "https://images.unsplash.com/photo-1611085583191-a3b181a88552?q=80&w=1974&auto=format&fit=crop",
      price: 52.99,
      category: "Jewelry",
      rating: 4,
      isFavorite: true
    },
  ],
  homeDecor: [
    {
      id: 10,
      title: "Hand-Blown Glass Vase",
      image: "https://images.unsplash.com/photo-1510024161393-3c5a65281b40?q=80&w=1974&auto=format&fit=crop",
      price: 89.95,
      category: "Home Decor",
      rating: 5,
      isFavorite: false
    },
    {
      id: 11,
      title: "Woven Wall Tapestry",
      image: "https://images.unsplash.com/photo-1577134614376-189e163dd8d3?q=80&w=1976&auto=format&fit=crop",
      price: 65.50,
      category: "Home Decor",
      rating: 4,
      isFavorite: false
    },
  ],
  textiles: [
    {
      id: 8,
      title: "Embroidered Linen Napkins",
      image: "https://images.unsplash.com/photo-1597696929736-6d13bed8e6a8?q=80&w=1974&auto=format&fit=crop",
      price: 42.00,
      category: "Textiles",
      rating: 4,
      isFavorite: false
    },
    {
      id: 12,
      title: "Hand-Knit Wool Throw",
      image: "https://images.unsplash.com/photo-1584346133934-899e65a660be?q=80&w=1974&auto=format&fit=crop",
      price: 129.00,
      category: "Textiles",
      rating: 5,
      isFavorite: true
    },
  ],
};

const PopularCrafts = () => {
  return (
    <section id="popular" className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Popular Right Now</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the most sought-after handcrafted items our customers love
        </p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-muted">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="jewelry">Jewelry</TabsTrigger>
            <TabsTrigger value="homeDecor">Home Decor</TabsTrigger>
            <TabsTrigger value="textiles">Textiles</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCrafts.all.map((craft) => (
              <CraftCard key={craft.id} craft={craft} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="jewelry" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCrafts.jewelry.map((craft) => (
              <CraftCard key={craft.id} craft={craft} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="homeDecor" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCrafts.homeDecor.map((craft) => (
              <CraftCard key={craft.id} craft={craft} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="textiles" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCrafts.textiles.map((craft) => (
              <CraftCard key={craft.id} craft={craft} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-12">
        <Button size="lg">
          View All Products
        </Button>
      </div>
    </section>
  );
};

export default PopularCrafts;
