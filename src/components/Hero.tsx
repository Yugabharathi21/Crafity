import React from 'react';
import Button from './Button';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Handcrafted with Passion</h1>
        <p className="hero-subtitle">
          Discover unique artisan products made with skill, tradition, and love
        </p>
        <div className="hero-buttons">
          <Button>Shop Now</Button>
          <Button type="secondary">Meet Our Artisans</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;