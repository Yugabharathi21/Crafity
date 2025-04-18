import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Jewelry',
    description: 'Handcrafted jewelry pieces made with precious metals and stones',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Pottery',
    description: 'Beautiful ceramic and pottery items for your home',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Textiles',
    description: 'Handwoven textiles and fabrics from around the world',
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Woodwork',
    description: 'Handcrafted wooden furniture and decorative items',
    image: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Glass',
    description: 'Hand-blown glass art and decorative pieces',
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: 'Leather',
    description: 'Handcrafted leather goods and accessories',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
];

const Categories: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Categories</h1>
          <p className="mt-2 text-sm text-gray-700">
            Explore our handcrafted items by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.name.toLowerCase()}`}
              className="group"
            >
              <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-center object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="mt-2 text-sm text-gray-200">{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;