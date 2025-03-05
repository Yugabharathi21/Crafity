import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Search, SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
  const { t } = useTranslation();
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const products = [
    {
      id: '1',
      title: 'Handcrafted Leather Wallet',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3',
      category: 'Accessories'
    },
    {
      id: '2',
      title: 'Ceramic Coffee Mug',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3',
      category: 'Home & Living'
    },
    {
      id: '3',
      title: 'Wooden Cutting Board',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1605287977617-ddd865d5f696?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3',
      category: 'Kitchen'
    }
    // Add more products as needed
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="font-semibold mb-4">{t('common.search')}</h3>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder={t('common.search')} className="pl-8" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('common.price')}</h3>
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-2"
            />
            <div className="flex justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t('common.category')}</h3>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">All Categories</Button>
              <Button variant="ghost" className="w-full justify-start">Accessories</Button>
              <Button variant="ghost" className="w-full justify-start">Home & Living</Button>
              <Button variant="ghost" className="w-full justify-start">Kitchen</Button>
              <Button variant="ghost" className="w-full justify-start">Art</Button>
              <Button variant="ghost" className="w-full justify-start">Jewelry</Button>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{t('common.shop')}</h2>
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              {t('common.filter')}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
                  <h3 className="font-semibold mb-2">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}