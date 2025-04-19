import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Craftify</h3>
            <p className="text-gray-400">
              Connecting artisans with customers who appreciate handcrafted quality and unique designs.
              Support local craftsmen and discover one-of-a-kind treasures.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors duration-200">Shop</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white transition-colors duration-200">Categories</Link></li>
              <li><Link to="/artisans" className="text-gray-400 hover:text-white transition-colors duration-200">Artisans</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/woodwork" className="text-gray-400 hover:text-white transition-colors duration-200">Woodwork</Link></li>
              <li><Link to="/category/pottery" className="text-gray-400 hover:text-white transition-colors duration-200">Pottery</Link></li>
              <li><Link to="/category/textiles" className="text-gray-400 hover:text-white transition-colors duration-200">Textiles</Link></li>
              <li><Link to="/category/jewelry" className="text-gray-400 hover:text-white transition-colors duration-200">Jewelry</Link></li>
              <li><Link to="/category/leatherwork" className="text-gray-400 hover:text-white transition-colors duration-200">Leatherwork</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2" />
                123 Artisan Street, Craftsville
              </p>
              <p className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                (555) 123-4567
              </p>
              <p className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                info@craftify.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Craftify. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Developed by <a 
            href="https://yugabharathi21.netlify.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-300 transition-colors duration-200 inline-flex items-center"
          >
            Yugabhrathi J <ExternalLink size={14} className="ml-1" />
          </a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;