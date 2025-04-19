import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { addToCart } from '../store/cartSlice';
import Button from '../components/Button';
import api from '../utils/api';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  description: string;
  category: string;
  rating: number;
  numReviews: number;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProductById(id!);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.countInStock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await dispatch(addToCart({
        product_id: product.id,
        quantity
      })).unwrap();
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold text-red-600">Product not found</h2>
        <p className="text-gray-600 mt-2">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              ({product.numReviews} reviews)
            </span>
          </div>
          
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-gray-100 rounded-l-lg"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-center min-w-[40px]">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-gray-100 rounded-r-lg"
                  disabled={quantity >= product.countInStock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
            
            {product.countInStock <= 5 && product.countInStock > 0 && (
              <p className="text-sm text-red-600">
                Only {product.countInStock} left in stock
              </p>
            )}
          </div>
          
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-600">
              <div>
                <span className="font-medium">Category:</span>
                <span className="ml-2">{product.category}</span>
              </div>
              <div>
                <span className="font-medium">Stock:</span>
                <span className="ml-2">
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;