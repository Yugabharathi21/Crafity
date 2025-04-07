import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/Button';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="text-green-500 mb-6">
          <CheckCircle size={64} className="mx-auto" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
          {orderId && (
            <span className="block mt-2">
              Order ID: <span className="font-semibold">{orderId}</span>
            </span>
          )}
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => navigate('/dashboard')}
            className="w-full"
          >
            View Order Status
          </Button>
          
          <Button
            onClick={() => navigate('/shop')}
            type="secondary"
            className="w-full"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;