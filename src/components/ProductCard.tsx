import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast';
import { AppDispatch } from '../store/store';

interface Product {
  id: string;
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

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = async () => {
    try {
      if (!product.countInStock) {
        toast.error('Sorry, this product is out of stock');
        return;
      }

      console.log('Adding product to cart:', {
        id: product.id,
        name: product.name,
        countInStock: product.countInStock
      });

      await dispatch(addToCart({
        product_id: product.id,
        quantity: 1
      })).unwrap();

      toast.success('Added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover"
          />
        </Link>
        <button 
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          onClick={() => toast.success('Added to favorites')}
        >
          <Heart size={20} className="text-gray-600" />
        </button>
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
          {product.category}
        </div>
      </div>

      <div className="p-5">
        <Link 
          to={`/product/${product.id}`}
          className="block mb-2"
        >
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        <Link 
          to={`/artisan/${product.artisan._id}`}
          className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
        >
          by {product.artisan.name}
        </Link>

        <div className="flex items-center mt-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={16}
                className={`${
                  index < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.numReviews} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
              product.countInStock > 0
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart size={18} />
            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>

        {product.countInStock <= 5 && product.countInStock > 0 && (
          <p className="mt-2 text-sm text-red-600">
            Only {product.countInStock} left in stock
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;