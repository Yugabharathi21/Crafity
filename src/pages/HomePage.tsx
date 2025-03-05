import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Hammer, Star, Users, ShoppingBag } from 'lucide-react';

export default function HomePage() {
  const { t } = useTranslation();

  const featuredProducts = [
    {
      id: '1',
      title: 'Handcrafted Leather Wallet',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3',
      rating: 4.8
    },
    {
      id: '2',
      title: 'Ceramic Coffee Mug',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3',
      rating: 4.9
    },
    {
      id: '3',
      title: 'Wooden Cutting Board',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1605287977617-ddd865d5f696?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3',
      rating: 4.7
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="relative z-10 space-y-6 text-white max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold">{t('home.hero.title')}</h1>
          <p className="text-xl">{t('home.hero.subtitle')}</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            {t('home.hero.cta')}
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{t('home.featured.title')}</h2>
          <p className="text-muted-foreground">{t('home.featured.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id}>
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{product.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">${product.price}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container py-12 bg-muted/30 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Hammer className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Quality Craftsmanship</h3>
            <p className="text-muted-foreground">Every item is handmade with care and attention to detail</p>
          </div>
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Direct from Artisans</h3>
            <p className="text-muted-foreground">Support local craftsmen and their unique creations</p>
          </div>
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Secure Shopping</h3>
            <p className="text-muted-foreground">Safe and secure transactions with buyer protection</p>
          </div>
        </div>
      </section>
    </div>
  );
}