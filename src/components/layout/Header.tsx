import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  Package, 
  LogOut, 
  ChevronDown,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import MobileNav from './MobileNav';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-[#708238]" />
          <span className="text-2xl font-bold tracking-tight text-[#708238]">Craftify</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-1 text-foreground/70 hover:text-foreground transition-colors">
                <span>Shop</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/shop" className="w-full cursor-pointer">All Products</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/shop/category/pottery" className="w-full cursor-pointer">Pottery</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop/category/textiles" className="w-full cursor-pointer">Textiles</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop/category/woodwork" className="w-full cursor-pointer">Woodwork</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop/category/jewelry" className="w-full cursor-pointer">Jewelry</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop/category/paper-crafts" className="w-full cursor-pointer">Paper Crafts</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/shop/category/home-decor" className="w-full cursor-pointer">Home Decor</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/about" className="text-foreground/70 hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-foreground/70 hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>

        {/* Search */}
        <div className="hidden md:flex items-center max-w-sm w-full mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="w-full pl-8"
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4">
          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <Heart className="h-6 w-6 text-muted-foreground hover:text-[#D36C3F] transition-colors" />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-muted-foreground hover:text-[#D36C3F] transition-colors" />
            {cart.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#D36C3F] text-[10px] font-medium text-white">
                {cart.totalItems}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer">Dashboard</Link>
                </DropdownMenuItem>
                {user.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="cursor-pointer">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/wishlist" className="cursor-pointer">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;