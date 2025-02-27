import React, { useState } from 'react';
import Button from './Button';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed with email:', email);
    setEmail('');
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <section className="newsletter section">
      <div className="container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Join Our Community</h2>
          <p className="newsletter-text">
            Subscribe to our newsletter to receive updates on new artisans, 
            special offers, and upcoming craft events.
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button className="newsletter-btn">Subscribe</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;