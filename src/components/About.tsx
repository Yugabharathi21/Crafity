
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-16 bg-crafty-50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Crafity</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              Crafity is a curated marketplace connecting skilled artisans with people who appreciate handcrafted quality. We believe in the power of human creativity and the value of items made with passion and dedication.
            </p>
            <p className="text-lg mb-6 text-muted-foreground">
              Our mission is to support independent craftspeople while providing customers with unique, high-quality handmade goods that cannot be mass-produced. Each item in our collection tells a story and carries the distinct touch of its creator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button>Our Story</Button>
              <Button variant="outline">Join as Artisan</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=1669&auto=format&fit=crop"
                alt="Artisan crafting"
                className="rounded-lg w-full h-40 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=1976&auto=format&fit=crop"
                alt="Handmade product"
                className="rounded-lg w-full h-56 object-cover"
              />
            </div>
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1620783770629-122b7f187703?q=80&w=1974&auto=format&fit=crop"
                alt="Crafting workshop"
                className="rounded-lg w-full h-56 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1616016757924-02e7091bb0f6?q=80&w=1780&auto=format&fit=crop"
                alt="Handcraft detail"
                className="rounded-lg w-full h-40 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
