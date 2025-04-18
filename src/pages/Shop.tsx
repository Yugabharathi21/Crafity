import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';

interface Product {
  _id: string;
  name: string;
  artisan: {
    _id: string;
    name: string;
  };
  price: number;
  image: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
}

const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { user } = useAuth();
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  
  const products: Product[] = [
    {
      _id: '1',
      name: "Hand-carved Wooden Bowl",
      artisan: {
        _id: 'a1',
        name: "Thomas Woodcraft"
      },
      price: 89.99,
      image: "https://images.unsplash.com/photo-1635983495219-8256f1e4a663?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Woodwork",
      rating: 4.8,
      numReviews: 124,
      countInStock: 10
    },
    {
      _id: '2',
      name: "Ceramic Vase Set",
      artisan: {
        _id: 'a2',
        name: "Elena Pottery"
      },
      price: 129.99,
      image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f5a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Pottery",
      rating: 4.9,
      numReviews: 89,
      countInStock: 5
    },
    {
      _id: '3',
      name: "Handwoven Wool Blanket",
      artisan: {
        _id: 'a3',
        name: "Mountain Textiles"
      },
      price: 159.99,
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Textiles",
      rating: 4.7,
      numReviews: 156,
      countInStock: 8
    },
    {
      _id: '4',
      name: "Handmade Leather Journal",
      artisan: {
        _id: 'a4',
        name: "Craft & Stitch"
      },
      price: 49.99,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Leatherwork",
      rating: 4.6,
      numReviews: 78,
      countInStock: 0
    }
  ];

  const categories = [
    'all',
    'jewelry',
    'pottery',
    'textiles',
    'woodwork',
    'glass',
    'leather',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Shop</h1>
          <p className="mt-2 text-sm text-gray-700">
            Browse our collection of handcrafted items
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        <div className="text-center py-12">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;