import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  itemCount: number;
  featured: boolean;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: "Woodwork",
      description: "Handcrafted wooden furniture, decor, and functional pieces made with traditional techniques.",
      image: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      itemCount: 42,
      featured: true
    },
    {
      id: 2,
      name: "Pottery",
      description: "Beautiful ceramic pieces including vases, plates, bowls, and decorative items.",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      itemCount: 38,
      featured: true
    },
    {
      id: 3,
      name: "Textiles",
      description: "Hand-woven fabrics, blankets, rugs, and clothing made with traditional looms.",
      image: "https://images.unsplash.com/photo-1551893134-55dc1b0cde1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      itemCount: 29,
      featured: true
    },
    {
      id: 4,
      name: "Jewelry",
      description: "Handcrafted jewelry pieces including necklaces, bracelets, and earrings.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      itemCount: 56,
      featured: true
    },
    {
      id: 5,
      name: "Leatherwork",
      description: "Quality leather goods including bags, wallets, and accessories.",
      image: "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      itemCount: 31,
      featured: false
    },
    {
      id: 6,
      name: "Glasswork",
      description: "Hand-blown glass pieces including vases, sculptures, and decorative items.",
      image: "https://images.unsplash.com/photo-1540690448301-9f7ead5263ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      itemCount: 24,
      featured: false
    },
    {
      id: 7,
      name: "Metal Work",
      description: "Hand-forged metal items including decorative pieces and functional tools.",
      image: "https://images.unsplash.com/photo-1605125207267-f27feb22899d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      itemCount: 18,
      featured: false
    },
    {
      id: 8,
      name: "Paper Crafts",
      description: "Handmade paper products including stationery, art prints, and decorative items.",
      image: "https://images.unsplash.com/photo-1598620617137-2ab990aadd37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      itemCount: 22,
      featured: false
    }
  ];

  return (
    <div className="categories-page">
      <div className="categories-header">
        <div className="container">
          <h1>Browse Categories</h1>
          <p>Explore our collection of handcrafted items by category</p>
        </div>
      </div>

      <div className="container">
        <div className="featured-categories">
          <h2>Featured Categories</h2>
          <div className="categories-grid featured">
            {categories.filter(category => category.featured).map(category => (
              <Link 
                to={`/shop?category=${category.name.toLowerCase()}`} 
                className="category-card featured" 
                key={category.id}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="item-count">{category.itemCount} items</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="all-categories">
          <h2>All Categories</h2>
          <div className="categories-grid">
            {categories.filter(category => !category.featured).map(category => (
              <Link 
                to={`/shop?category=${category.name.toLowerCase()}`} 
                className="category-card" 
                key={category.id}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <div className="category-content">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="item-count">{category.itemCount} items</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;