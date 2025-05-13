
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-crafty-800/90 to-crafty-800/70 -z-10"></div>
      <div 
        className="absolute inset-0 -z-20 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1560421683-6856ea585c78?q=80&w=1974&auto=format&fit=crop')",
        }}
      ></div>
      
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Handcrafted Treasures
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md">
            Explore unique handmade crafts from talented artisans around the world. Find the perfect piece to express your style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-crafty-800 hover:bg-white/90">
              Explore Collection
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
