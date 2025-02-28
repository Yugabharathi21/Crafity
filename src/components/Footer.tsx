import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3 className="footer-title">Craftify</h3>
            <p>
              Connecting artisans with customers who appreciate handcrafted quality and unique designs.
              Support local craftsmen and discover one-of-a-kind treasures.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-icon">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-icon">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="footer-section links">
            <h3 className="footer-title">Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/categories">Categories</a></li>
              <li><a href="/artisans">Artisans</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </div>

          <div className="footer-section categories">
            <h3 className="footer-title">Categories</h3>
            <ul>
              <li><a href="/category/woodwork">Woodwork</a></li>
              <li><a href="/category/pottery">Pottery</a></li>
              <li><a href="/category/textiles">Textiles</a></li>
              <li><a href="/category/jewelry">Jewelry</a></li>
              <li><a href="/category/leatherwork">Leatherwork</a></li>
            </ul>
          </div>

          <div className="footer-section contact">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <p>
                <MapPin size={16} className="contact-icon" />
                123 Artisan Street, Craftsville
              </p>
              <p>
                <Phone size={16} className="contact-icon" />
                (555) 123-4567
              </p>
              <p>
                <Mail size={16} className="contact-icon" />
                info@craftify.com
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Craftify. All rights reserved. <a href='https://github.com/Yugabharathi21'>Yugabharathi J</a>, <a> Soundariya M</a>,<a> Soumya K</a></p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;