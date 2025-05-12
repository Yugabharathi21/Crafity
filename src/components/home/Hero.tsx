import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/2084114/pexels-photo-2084114.jpeg"
          alt="Craftify Hero"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="max-w-xl text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Handcrafted with Love, <span className="text-[#D36C3F]">Delivered with Care</span>
          </h1>
          <p className="text-lg text-white/80">
            Discover unique and authentic handmade crafts from skilled artisans around the world.
            Each piece tells a story and brings a touch of artisanal beauty to your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-[#708238] hover:bg-[#5a6a2e] text-white"
              asChild
            >
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white/10"
              asChild
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;