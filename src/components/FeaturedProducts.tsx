import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Button from './Button';

const FeaturedProducts: React.FC = () => {
  const products = [
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
      countInStock: 15
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Creations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional handcrafted pieces, each telling a unique story of artisanal excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/shop">
            <Button type="secondary">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;