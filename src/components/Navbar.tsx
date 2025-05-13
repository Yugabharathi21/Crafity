
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("crafity-user");
    setIsLoggedIn(!!user);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchInput = form.elements.namedItem('search') as HTMLInputElement;
    navigate(`/shop?search=${searchInput.value}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-serif font-bold text-crafty-800">Crafity</Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/shop" className="font-medium hover:text-primary transition-colors">Shop</Link>
          <a href="#categories" className="font-medium hover:text-primary transition-colors">Categories</a>
          <a href="#featured" className="font-medium hover:text-primary transition-colors">Featured</a>
          <a href="#about" className="font-medium hover:text-primary transition-colors">About</a>
        </nav>
        
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              name="search"
              placeholder="Search crafts..."
              className="pl-10 w-[200px] bg-secondary"
            />
          </form>
          {isLoggedIn ? (
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" aria-label="Favorites">
            <Heart className="h-5 w-5" />
          </Button>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-crafty-500 text-white"
                  variant="default"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b p-4 animate-fade-in">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              name="search"
              placeholder="Search crafts..."
              className="pl-10 w-full bg-secondary"
            />
          </form>
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="font-medium px-2 py-1 hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="font-medium px-2 py-1 hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <a href="#categories" className="font-medium px-2 py-1 hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Categories</a>
            <a href="#featured" className="font-medium px-2 py-1 hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Featured</a>
            <a href="#about" className="font-medium px-2 py-1 hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="font-medium px-2 py-1 hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Link to="/cart" className="font-medium px-2 py-1 hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Cart ({totalItems})</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="font-medium px-2 py-1 hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="font-medium px-2 py-1 hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Register</Link>
                <Link to="/cart" className="font-medium px-2 py-1 hover:bg-secondary rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>Cart ({totalItems})</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
