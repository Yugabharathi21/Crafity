
import { Card } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Jewelry",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2000&auto=format&fit=crop",
    count: 128
  },
  {
    id: 2,
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1974&auto=format&fit=crop",
    count: 84
  },
  {
    id: 3,
    name: "Ceramics",
    image: "https://images.unsplash.com/photo-1426927308491-6380b6a9936f?q=80&w=2000&auto=format&fit=crop",
    count: 65
  },
  {
    id: 4,
    name: "Textiles",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1820&auto=format&fit=crop",
    count: 92
  },
  {
    id: 5,
    name: "Paper Crafts",
    image: "https://images.unsplash.com/photo-1582546338780-0cf4c2a07381?q=80&w=1974&auto=format&fit=crop",
    count: 43
  },
  {
    id: 6,
    name: "Woodworking",
    image: "https://images.unsplash.com/photo-1618038483079-fd729bd2c01f?q=80&w=1936&auto=format&fit=crop",
    count: 51
  }
];

const Categories = () => {
  return (
    <section id="categories" className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Explore Categories</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover handmade creations across various crafting styles and techniques
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="craft-card group overflow-hidden relative h-60 border-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10"></div>
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
              <h3 className="text-xl font-bold">{category.name}</h3>
              <p className="text-white/80 text-sm">{category.count} products</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Categories;
