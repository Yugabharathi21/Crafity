import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import type { Product } from '../types/supabase';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, loading } = useCart();
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setError(null);
    const result = await addToCart(product.id);
    if (!result) {
      setError('Failed to add to cart');
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-bold mt-2">${product.price}</p>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
}