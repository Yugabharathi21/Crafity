import React from 'react';
import { ImageIcon } from 'lucide-react';

interface ProductPlaceholderProps {
  className?: string;
}

const ProductPlaceholder: React.FC<ProductPlaceholderProps> = ({ className = '' }) => {
  return (
    <div className={`bg-gray-100 flex items-center justify-center ${className}`}>
      <ImageIcon className="w-12 h-12 text-gray-400" />
    </div>
  );
};

export default ProductPlaceholder; 