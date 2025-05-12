import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

const CategorySection = () => {
  const categories = getCategories();

  return (
    <section className="py-16 bg-[#f5f5dc]/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Explore our wide range of handcrafted categories, each featuring unique items made with passion and skill
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link to={`/shop/category/${category.slug}`} key={category.id}>
              <Card className="overflow-hidden h-64 transition-all duration-300 hover:shadow-md group border-0">
                <div className="relative h-full">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <p className="text-sm text-white/80 mt-1 line-clamp-2">
                      {category.description}
                    </p>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;