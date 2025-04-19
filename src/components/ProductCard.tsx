import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';
import { AppDispatch } from '../store/store';
import ProductPlaceholder from './ProductPlaceholder';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    imageAttribution?: string;
    price: number;
    stock: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCart({
        product_id: product.id,
        quantity: 1
      })).unwrap();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Link to={`/product/${product.id}`} className="relative block">
        {(!imageLoaded || imageError) && (
          <ProductPlaceholder className="w-full h-48" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-48 object-cover transition-opacity duration-200 ${
            imageLoaded && !imageError ? 'opacity-100' : 'opacity-0 absolute'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            console.error(`Failed to load image for product: ${product.name}`);
          }}
        />
        {imageLoaded && !imageError && product.imageAttribution && (
          <div 
            className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1"
            dangerouslySetInnerHTML={{ __html: product.imageAttribution }}
          />
        )}
      </Link>
      
      <div className="p-4">
        <Link
          to={`/product/${product.id}`}
          className="text-lg font-medium hover:text-blue-600"
        >
          {product.name}
        </Link>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="p-2 text-blue-600 hover:text-blue-700 disabled:text-gray-400"
              title={product.stock === 0 ? 'Out of stock' : 'Add to cart'}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            
            <button
              className="p-2 text-gray-600 hover:text-gray-700"
              title="Add to wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {product.stock <= 5 && product.stock > 0 && (
          <p className="mt-2 text-sm text-red-600">
            Only {product.stock} left in stock
          </p>
        )}
        
        {product.stock === 0 && (
          <p className="mt-2 text-sm text-red-600">Out of stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;