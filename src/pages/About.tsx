import React from 'react';
import { Package, Heart, Users, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Craftify</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're passionate about connecting skilled artisans with people who appreciate 
          unique, handcrafted items. Our platform celebrates creativity, craftsmanship, 
          and sustainable practices.
        </p>
      </div>

      {/* Mission & Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            To empower artisans worldwide by providing a platform where they can showcase 
            their craft and connect with customers who value handmade, sustainable products. 
            We believe in preserving traditional craftsmanship while embracing modern 
            technology to create a seamless shopping experience.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex items-start">
              <Heart className="h-6 w-6 text-[#708238] mr-2 flex-shrink-0" />
              <span>Passion for craftsmanship and attention to detail</span>
            </li>
            <li className="flex items-start">
              <Users className="h-6 w-6 text-[#708238] mr-2 flex-shrink-0" />
              <span>Supporting artisan communities and fair trade practices</span>
            </li>
            <li className="flex items-start">
              <Globe className="h-6 w-6 text-[#708238] mr-2 flex-shrink-0" />
              <span>Commitment to sustainability and environmental responsibility</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-[#f5f5dc]/30 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-[#708238] mb-2">500+</div>
          <div className="text-sm text-muted-foreground">Artisans Worldwide</div>
        </div>
        <div className="bg-[#f5f5dc]/30 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-[#708238] mb-2">10K+</div>
          <div className="text-sm text-muted-foreground">Products Listed</div>
        </div>
        <div className="bg-[#f5f5dc]/30 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-[#708238] mb-2">50K+</div>
          <div className="text-sm text-muted-foreground">Happy Customers</div>
        </div>
        <div className="bg-[#f5f5dc]/30 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold text-[#708238] mb-2">20+</div>
          <div className="text-sm text-muted-foreground">Countries Served</div>
        </div>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2023, Craftify began with a simple idea: to create a space where 
            artisans could thrive in the digital age. We recognized that while the world 
            was becoming increasingly digital, there was still a deep appreciation for 
            handcrafted items and the stories behind them.
          </p>
          <p className="text-muted-foreground">
            Today, we're proud to host hundreds of talented artisans from around the 
            world, each bringing their unique cultural heritage and craftsmanship to 
            our platform. Our community continues to grow, united by a shared passion 
            for authentic, handmade creations.
          </p>
        </div>
        <div className="aspect-square rounded-lg overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3934623/pexels-photo-3934623.jpeg" 
            alt="Artisan at work"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"
            },
            {
              name: "Michael Chen",
              role: "Head of Curation",
              image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
            },
            {
              name: "Emily Rodriguez",
              role: "Artisan Relations",
              image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
            },
            {
              name: "David Kim",
              role: "Operations Director",
              image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
            }
          ].map((member, index) => (
            <div key={index} className="group">
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Join Us Section */}
      <div className="bg-[#f5f5dc]/30 rounded-lg p-8 text-center">
        <Package className="h-12 w-12 text-[#708238] mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Whether you're an artisan looking to share your craft or a customer seeking 
          unique handmade items, we'd love to have you as part of our growing community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/register" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-[#708238] text-white hover:bg-[#5a6a2e] h-9 px-4 py-2"
          >
            Join as an Artisan
          </a>
          <a 
            href="/shop" 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
          >
            Start Shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;