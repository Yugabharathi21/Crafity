import React from 'react';
import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/product/FeaturedProducts';
import Testimonials from '@/components/home/Testimonials';
import Features from '@/components/home/Features';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
      <CategorySection />
      <FeaturedProducts />
      <Testimonials />
    </div>
  );
};

export default Home;