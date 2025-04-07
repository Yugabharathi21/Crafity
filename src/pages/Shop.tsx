import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop Handcrafted Items</h1>
          <p className="mt-2 text-gray-600">Discover unique pieces made by talented artisans</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button 
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-gray-500" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown size={16} className="text-gray-500 -ml-8 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;