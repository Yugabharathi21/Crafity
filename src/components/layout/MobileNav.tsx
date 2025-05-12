import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, ShoppingBag, Info, Phone, Heart, Package } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full sm:max-w-sm p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
              <Package className="h-6 w-6 text-[#708238]" />
              <SheetTitle className="text-2xl font-bold tracking-tight text-[#708238]">Craftify</SheetTitle>
            </Link>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        
        <div className="px-6 py-4">
          <div className="relative mb-4">
            <Input
              placeholder="Search products..."
              className="w-full"
            />
          </div>

          <nav className="space-y-1">
            <SheetClose asChild>
              <Link 
                to="/" 
                className="flex items-center space-x-2 py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
            </SheetClose>
            
            <Accordion type="single" collapsible className="w-full border-0">
              <AccordionItem value="shop" className="border-0">
                <AccordionTrigger className="flex items-center justify-between py-2 text-foreground/70 hover:text-foreground transition-colors">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Shop</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-7 space-y-1">
                  <SheetClose asChild>
                    <Link 
                      to="/shop" 
                      className="block py-2 text-foreground/70 hover:text-foreground transition-colors"
                    >
                      All Products
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/shop/category/pottery" 
                      className="block py-2 text-foreground/70 hover:text-foreground transition-colors"
                    >
                      Pottery
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/shop/category/textiles" 
                      className="block py-2 text-foreground/70 hover:text-foreground transition-colors"
                    >
                      Textiles
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/shop/category/woodwork" 
                      className="block py-2 text-foreground/70 hover:text-foreground transition-colors"
                    >
                      Woodwork
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/shop/category/jewelry" 
                      className="block py-2 text-foreground/70 hover:text-foreground transition-colors"
                    >
                      Jewelry
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/shop/category/paper-crafts" 
                      className="block py-2 text-foreground/70 hover:text-foreground transition-colors"
                    >
                      Paper Crafts
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      to="/shop/category/home-decor" 
                      className="block py-2 text-foreground/70 hover:text-foreground transition-colors"
                    >
                      Home Decor
                    </Link>
                  </SheetClose>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <SheetClose asChild>
              <Link 
                to="/about" 
                className="flex items-center space-x-2 py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                <Info className="h-5 w-5" />
                <span>About</span>
              </Link>
            </SheetClose>
            
            <SheetClose asChild>
              <Link 
                to="/contact" 
                className="flex items-center space-x-2 py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>Contact</span>
              </Link>
            </SheetClose>
            
            <SheetClose asChild>
              <Link 
                to="/wishlist" 
                className="flex items-center space-x-2 py-2 text-foreground/70 hover:text-foreground transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>
            </SheetClose>
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <div className="grid grid-cols-2 gap-4">
            <SheetClose asChild>
              <Button asChild variant="outline" className="w-full">
                <Link to="/login">Sign In</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button asChild className="w-full">
                <Link to="/register">Register</Link>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;