
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, User, ShoppingBag, Heart, MapPin, 
  Settings, LogOut, Menu, ChevronRight, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

type NavItemProps = {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const NavItem = ({ href, icon: Icon, label, active, onClick }: NavItemProps) => {
  return (
    <Link 
      to={href} 
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md transition-all",
        active 
          ? "bg-accent text-accent-foreground font-medium" 
          : "hover:bg-accent/50 text-muted-foreground"
      )}
      onClick={onClick}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

type NavGroupProps = {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const NavGroup = ({ label, children, defaultOpen = false }: NavGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="space-y-1">
      <Button
        variant="ghost"
        className="w-full justify-between px-3 font-medium text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </Button>
      {isOpen && (
        <div className="pl-3 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

interface DashboardSidebarProps {
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
}

const DashboardSidebar = ({ 
  isMobileSidebarOpen, 
  setMobileSidebarOpen 
}: DashboardSidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  const closeMenu = () => setMobileSidebarOpen(false);
  
  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className={cn(
      "bg-card border-r border-border h-screen fixed lg:sticky top-0 w-64 shrink-0 z-40 transition-all",
      isMobileSidebarOpen ? "left-0" : "-left-64 lg:left-0"
    )}>
      <div className="h-full flex flex-col">
        <div className="h-16 border-b border-border flex items-center px-4 sticky top-0 bg-card z-20">
          <div className="flex items-center justify-between w-full">
            <Link to="/" className="text-xl font-serif font-bold text-primary">
              Crafity
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileSidebarOpen(false)} 
              className="lg:hidden"
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          <div className="space-y-1">
            <NavItem 
              href="/dashboard" 
              icon={Home} 
              label="Dashboard" 
              active={isActive('/dashboard')}
              onClick={closeMenu}
            />
            <NavItem 
              href="/dashboard/profile" 
              icon={User} 
              label="Profile" 
              active={isActive('/dashboard/profile')}
              onClick={closeMenu}
            />
          </div>
          
          <NavGroup label="Shopping" defaultOpen>
            <NavItem 
              href="/dashboard/orders" 
              icon={ShoppingBag} 
              label="Orders" 
              active={isActive('/dashboard/orders')}
              onClick={closeMenu}
            />
            <NavItem 
              href="/dashboard/wishlist" 
              icon={Heart} 
              label="Wishlist" 
              active={isActive('/dashboard/wishlist')}
              onClick={closeMenu}
            />
          </NavGroup>
          
          <div className="space-y-1">
            <NavItem 
              href="/dashboard/addresses" 
              icon={MapPin} 
              label="Addresses" 
              active={isActive('/dashboard/addresses')}
              onClick={closeMenu}
            />
            <NavItem 
              href="/dashboard/settings" 
              icon={Settings} 
              label="Settings" 
              active={isActive('/dashboard/settings')}
              onClick={closeMenu}
            />
          </div>
        </nav>
        
        <div className="border-t border-border p-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground hover:text-foreground" 
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
