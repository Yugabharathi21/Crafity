import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut
} from 'lucide-react';

export default function DashboardLayout() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const sidebarItems = user?.role === 'seller' ? [
    { icon: LayoutDashboard, label: t('dashboard.seller.title'), href: '/dashboard/seller' },
    { icon: Package, label: t('dashboard.seller.products'), href: '/dashboard/products' },
    { icon: ShoppingCart, label: t('dashboard.seller.orders'), href: '/dashboard/orders' },
    { icon: Users, label: t('dashboard.seller.customers'), href: '/dashboard/customers' },
    { icon: Settings, label: t('dashboard.seller.settings'), href: '/dashboard/settings' }
  ] : [
    { icon: LayoutDashboard, label: t('dashboard.buyer.title'), href: '/dashboard/buyer' },
    { icon: ShoppingCart, label: t('dashboard.buyer.orders'), href: '/dashboard/orders' },
    { icon: Package, label: t('dashboard.buyer.wishlist'), href: '/dashboard/wishlist' },
    { icon: Settings, label: t('dashboard.buyer.settings'), href: '/dashboard/settings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-muted/30">
          <div className="p-6">
            <h2 className="text-lg font-semibold">{t('common.dashboard')}</h2>
            <nav className="mt-6 space-y-2">
              {sidebarItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => logout()}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              >
                <LogOut className="h-4 w-4" />
                {t('common.logout')}
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}