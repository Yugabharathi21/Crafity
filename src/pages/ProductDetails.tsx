import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';
import Button from '../components/Button';
import api from '../utils/api';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  artisan: {
    _id: string;
    name: string;
  };
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value: number) => {
    if (product && value >= 1 && value <= product.countInStock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
        countInStock: product.countInStock
      }));
      toast.success('Added to cart');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Skeleton height={400} />
          </div>
          <div className="md:w-1/2">
            <Skeleton height={40} width={300} className="mb-4" />
            <Skeleton height={30} width={150} className="mb-4" />
            <Skeleton height={100} className="mb-4" />
            <Skeleton height={40} width={200} className="mb-4" />
            <Skeleton height={50} width={250} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p className="mb-4">{error || 'Product not found'}</p>
        <Button onClick={() => navigate('/shop')}>Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={index < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.numReviews} reviews)</span>
          </div>

          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <p className="font-semibold mb-2">Category: {product.category}</p>
            <p className="font-semibold">Artisan: {product.artisan.name}</p>
          </div>

          {product.countInStock > 0 ? (
            <>
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Plus size={20} />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
            </>
          ) : (
            <p className="text-red-500 font-semibold">Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;