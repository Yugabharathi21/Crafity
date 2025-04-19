import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import Button from './Button';
import { searchUnsplashImages, createUnsplashAttribution } from '../utils/unsplash';
import { Spinner } from './Spinner';

interface Product {
  id: string;
  name: string;
  artisan: {
    id: string;
    name: string;
  };
  price: number;
  image: string;
  imageAttribution?: string;
  category: string;
  rating: number;
  numReviews: number;
  stock: number;
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const initialProducts = [
        {
          id: "d2f7d314-9df6-4c0e-8e9b-1f2b3c4d5e6f",
          name: "Hand-carved Wooden Bowl",
          artisan: {
            id: "a1f2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c",
            name: "Thomas Woodcraft"
          },
          price: 89.99,
          image: "/placeholder-product.jpg",
          category: "Woodwork",
          rating: 4.8,
          numReviews: 124,
          stock: 10
        },
        {
          id: "e5f6g7h8-9i0j-4k1l-8m9n-2o3p4q5r6s7t",
          name: "Ceramic Vase Set",
          artisan: {
            id: "b2c3d4e5-f6g7-4h8i-9j0k-1l2m3n4o5p6",
            name: "Elena Pottery"
          },
          price: 129.99,
          image: "/placeholder-product.jpg",
          category: "Pottery",
          rating: 4.9,
          numReviews: 89,
          stock: 5
        },
        {
          id: "u8v9w0x1-y2z3-4a5b-8c9d-6e7f8g9h0i1j",
          name: "Handwoven Wool Blanket",
          artisan: {
            id: "c3d4e5f6-g7h8-4i9j-0k1l-2m3n4o5p6q7",
            name: "Mountain Textiles"
          },
          price: 159.99,
          image: "/placeholder-product.jpg",
          category: "Textiles",
          rating: 4.7,
          numReviews: 156,
          stock: 8
        },
        {
          id: "k2l3m4n5-o6p7-4q8r-8s9t-9u0v1w2x3y4z",
          name: "Handmade Leather Journal",
          artisan: {
            id: "d4e5f6g7-h8i9-4j0k-1l2m-3n4o5p6q7r8",
            name: "Craft & Stitch"
          },
          price: 49.99,
          image: "/placeholder-product.jpg",
          category: "Leatherwork",
          rating: 4.6,
          numReviews: 78,
          stock: 15
        }
      ];

      try {
        // Load images for each product
        const productsWithImages = await Promise.all(
          initialProducts.map(async (product) => {
            const images = await searchUnsplashImages(product.category + " " + product.name, 1, 1);
            if (images && images.length > 0) {
              return {
                ...product,
                image: images[0].urls.regular,
                imageAttribution: createUnsplashAttribution(images[0])
              };
            }
            return product;
          })
        );

        setProducts(productsWithImages);
      } catch (error) {
        console.error('Error loading product images:', error);
        setProducts(initialProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/shop">
            <Button variant="secondary">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;