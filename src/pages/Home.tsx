import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Categories from '../components/Categories';
import ArtisanSpotlight from '../components/ArtisanSpotlight';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

const Home: React.FC = () => {
  return (
    <main className="home-page">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <ArtisanSpotlight />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;