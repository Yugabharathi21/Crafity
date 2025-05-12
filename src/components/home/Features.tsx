import React from 'react';
import { Truck, Shield, RefreshCw, Leaf } from 'lucide-react';

const features = [
  {
    icon: <Truck className="h-8 w-8 text-[#708238]" />,
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $50',
  },
  {
    icon: <Shield className="h-8 w-8 text-[#708238]" />,
    title: 'Secure Payment',
    description: 'Safe & secure checkout experience',
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-[#708238]" />,
    title: 'Easy Returns',
    description: '30-day easy return policy',
  },
  {
    icon: <Leaf className="h-8 w-8 text-[#708238]" />,
    title: 'Eco-Friendly',
    description: 'Sustainably sourced materials',
  },
];

const Features = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 border border-[#c1c6b7]/30 rounded-lg bg-[#f5f5dc]/20"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;