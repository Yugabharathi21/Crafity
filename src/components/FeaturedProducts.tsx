import React from 'react';
import Button from './Button';

interface Product {
  id: number;
  name: string;
  artisan: string;
  price: number;
  image: string;
  category: string;
}

const FeaturedProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Hand-carved Wooden Bowl",
      artisan: "Thomas Woodcraft",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1635983495219-8256f1e4a663?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Woodwork"
    },
    {
      id: 2,
      name: "Ceramic Vase Set",
      artisan: "Elena Pottery",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f5a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Pottery"
    },
    {
      id: 3,
      name: "Handwoven Wool Blanket",
      artisan: "Mountain Textiles",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Textiles"
    },
    {
      id: 4,
      name: "Handmade Leather Journal",
      artisan: "Craft & Stitch",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      category: "Leatherwork"
    }
  ];

  return (
    <section className="featured-products section">
      <div className="container">
        <h2 className="section-title">Featured Creations</h2>
        <div className="products-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-category">{product.category}</div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-artisan">by {product.artisan}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <Button className="product-btn">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all">
          <Button type="secondary">View All Products</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;