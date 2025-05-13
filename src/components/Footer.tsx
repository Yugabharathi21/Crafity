
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-crafty-800 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Crafity</h3>
            <p className="text-white/80 mb-6">
              Handcrafted with love, curated with care. Discover unique artisan creations from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-crafty-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-crafty-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-crafty-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="#categories" className="text-white/80 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#featured" className="text-white/80 hover:text-white transition-colors">Featured</a></li>
              <li><a href="#popular" className="text-white/80 hover:text-white transition-colors">Popular</a></li>
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Subscribe</h4>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-crafty-700 border-crafty-600 focus-visible:ring-crafty-500 text-white placeholder:text-white/60"
              />
              <Button className="bg-crafty-500 hover:bg-crafty-400 text-white w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-crafty-700 mt-10 pt-6 text-center text-white/60">
          <p>© {new Date().getFullYear()} Crafity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
