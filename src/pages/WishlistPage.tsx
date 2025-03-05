import { useTranslation } from 'react-i18next';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, ShoppingCart } from 'lucide-react';

export default function WishlistPage() {
  const { t } = useTranslation();
  const { items, removeItem } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-4">{t('dashboard.buyer.noWishlist')}</h2>
        <Button asChild>
          <a href="/shop">{t('cart.continueShopping')}</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{t('common.wishlist')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id}>
            <div className="aspect-square relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{item.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">${item.price}</span>
                <div className="flex gap-2">
                  <Button size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {t('product.addToCart')}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}