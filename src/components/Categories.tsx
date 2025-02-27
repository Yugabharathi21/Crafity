import React from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      id: 1,
      name: "Woodwork",
      image: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      count: 42
    },
    {
      id: 2,
      name: "Pottery",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      count: 38
    },
    {
      id: 3,
      name: "Textiles",
      image: "https://images.unsplash.com/photo-1551893134-55dc1b0cde1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      count: 29
    },
    {
      id: 4,
      name: "Jewelry",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      count: 56
    },
    {
      id: 5,
      name: "Leatherwork",
      image: "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      count: 31
    },
    {
      id: 6,
      name: "Glasswork",
      image: "https://images.unsplash.com/photo-1540690448301-9f7ead5263ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      count: 24
    }
  ];

  return (
    <section className="categories section">
      <div className="container">
        <h2 className="section-title">Browse Categories</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <a href={`/category/${category.name.toLowerCase()}`} className="category-card" key={category.id}>
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="category-overlay">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.count} items</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;