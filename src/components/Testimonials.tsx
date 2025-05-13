
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Happy Customer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    quote: "I am absolutely in love with my handmade ceramic set. The craftsmanship is exceptional and it's clear that so much love went into making it."
  },
  {
    id: 2,
    name: "Michael Wei",
    role: "Collector",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
    quote: "Crafity has completely transformed how I discover artisanal products. The quality and uniqueness of items I've purchased is unmatched."
  },
  {
    id: 3,
    name: "Sarah Thompson",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1974&auto=format&fit=crop",
    quote: "As a designer, I rely on finding distinctive pieces for my clients. Crafity has become my go-to source for one-of-a-kind home decor items."
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-accent/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real experiences from people who appreciate handcrafted quality
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-background border-none shadow-md">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="w-16 h-16 border-2 border-primary mb-4">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="inline-block w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="italic text-foreground mb-4">
                  "{testimonial.quote}"
                </blockquote>
                
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
