
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="container py-16 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2 text-center">Thank You for Your Order!</h1>
      <p className="text-center text-muted-foreground mb-8 max-w-md">
        Your payment was successful and your order has been placed. You'll receive a confirmation email shortly.
      </p>
      
      <div className="bg-muted/20 border rounded-lg p-6 mb-8 w-full max-w-md">
        <h2 className="text-lg font-medium mb-4">Order Details</h2>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-medium">#CR{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method</span>
            <span>Credit Card</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping Method</span>
            <span>Standard Shipping</span>
          </div>
          
          <div className="flex justify-between pt-2 border-t mt-2">
            <span className="font-medium">Estimated Delivery</span>
            <span className="font-medium">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button variant="default">Continue Shopping</Button>
        </Link>
        <Link to="/orders">
          <Button variant="outline" className="gap-2">
            <ShoppingBag size={16} /> View My Orders
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
