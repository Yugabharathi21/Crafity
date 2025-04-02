import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, User, Sun, Moon, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CartProvider } from '../contexts/CartContext';

const MainLayout = () => {
  const { t } = useTranslation();
  const { setTheme } = useTheme();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default MainLayout;