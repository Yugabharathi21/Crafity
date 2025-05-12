import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Package, 
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

// Form validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Phone number is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Zip code is required'),
  paymentMethod: z.enum(['credit_card', 'cod']),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

enum CheckoutStep {
  ShippingInfo,
  PaymentMethod,
  Review,
  Success
}

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.ShippingInfo);
  
  // Calculate order summary
  const subtotal = cart.totalPrice;
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      paymentMethod: 'credit_card',
    },
  });

  const watchedValues = watch();

  const onSubmit = (data: CheckoutFormValues) => {
    // For demo purposes, just move to the success step
    // In a real app, you would send this data to your backend
    setCurrentStep(CheckoutStep.Success);
    
    // Clear the cart after successful checkout
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  if (cart.items.length === 0 && currentStep !== CheckoutStep.Success) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Alert className="mb-6">
            <AlertTitle className="font-semibold">Your cart is empty</AlertTitle>
            <AlertDescription>
              You don't have any items in your cart to checkout.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={() => navigate('/shop')}
            className="bg-[#708238] hover:bg-[#5a6a2e] text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Checkout Steps */}
        {currentStep !== CheckoutStep.Success && (
          <div className="mb-8">
            <div className="flex justify-between">
              <div 
                className={`flex flex-col items-center flex-1 ${
                  currentStep >= CheckoutStep.ShippingInfo ? 'text-[#708238]' : 'text-muted-foreground'
                }`}
              >
                <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-2 ${
                  currentStep >= CheckoutStep.ShippingInfo ? 'bg-[#708238] text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  1
                </div>
                <span className="text-sm">Shipping</span>
              </div>
              <div className="flex-1 flex items-center justify-center pt-4">
                <div className={`h-0.5 w-full ${
                  currentStep >= CheckoutStep.PaymentMethod ? 'bg-[#708238]' : 'bg-muted'
                }`}></div>
              </div>
              <div 
                className={`flex flex-col items-center flex-1 ${
                  currentStep >= CheckoutStep.PaymentMethod ? 'text-[#708238]' : 'text-muted-foreground'
                }`}
              >
                <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-2 ${
                  currentStep >= CheckoutStep.PaymentMethod ? 'bg-[#708238] text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
                <span className="text-sm">Payment</span>
              </div>
              <div className="flex-1 flex items-center justify-center pt-4">
                <div className={`h-0.5 w-full ${
                  currentStep >= CheckoutStep.Review ? 'bg-[#708238]' : 'bg-muted'
                }`}></div>
              </div>
              <div 
                className={`flex flex-col items-center flex-1 ${
                  currentStep >= CheckoutStep.Review ? 'text-[#708238]' : 'text-muted-foreground'
                }`}
              >
                <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-2 ${
                  currentStep >= CheckoutStep.Review ? 'bg-[#708238] text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  3
                </div>
                <span className="text-sm">Review</span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border rounded-lg p-6">
                {/* Shipping Information Step */}
                {currentStep === CheckoutStep.ShippingInfo && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          {...register('fullName')}
                          placeholder="John Doe"
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">{errors.fullName.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          placeholder="(555) 123-4567"
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          {...register('address')}
                          placeholder="123 Main St, Apt 4B"
                        />
                        {errors.address && (
                          <p className="text-sm text-destructive">{errors.address.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          {...register('city')}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="text-sm text-destructive">{errors.city.message}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            {...register('state')}
                            placeholder="NY"
                          />
                          {errors.state && (
                            <p className="text-sm text-destructive">{errors.state.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code</Label>
                          <Input
                            id="zipCode"
                            {...register('zipCode')}
                            placeholder="10001"
                          />
                          {errors.zipCode && (
                            <p className="text-sm text-destructive">{errors.zipCode.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button 
                        type="button" 
                        onClick={goToNextStep}
                        className="bg-[#708238] hover:bg-[#5a6a2e] text-white"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Payment Method Step */}
                {currentStep === CheckoutStep.PaymentMethod && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    
                    <RadioGroup 
                      defaultValue={watchedValues.paymentMethod}
                      className="space-y-4"
                      {...register('paymentMethod')}
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/40 transition-colors">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <Label 
                          htmlFor="credit_card" 
                          className="flex-1 flex items-center cursor-pointer"
                        >
                          <CreditCard className="h-5 w-5 mr-2 text-[#708238]" />
                          Credit / Debit Card
                        </Label>
                        <div className="flex space-x-1">
                          <div className="w-10 h-6 bg-[#1434CB] rounded"></div>
                          <div className="w-10 h-6 bg-[#FF5F00] rounded"></div>
                          <div className="w-10 h-6 bg-[#2DC160] rounded"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/40 transition-colors">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label 
                          htmlFor="cod" 
                          className="flex-1 flex items-center cursor-pointer"
                        >
                          <Package className="h-5 w-5 mr-2 text-[#708238]" />
                          Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {watchedValues.paymentMethod === 'credit_card' && (
                      <div className="mt-6 space-y-4 p-4 border rounded-lg bg-muted/20">
                        <div className="space-y-2">
                          <Label htmlFor="card_number">Card Number</Label>
                          <Input
                            id="card_number"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                              id="cvc"
                              placeholder="123"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="name_on_card">Name on Card</Label>
                          <Input
                            id="name_on_card"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6 flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={goToPreviousStep}
                      >
                        Back to Shipping
                      </Button>
                      <Button 
                        type="button" 
                        onClick={goToNextStep}
                        className="bg-[#708238] hover:bg-[#5a6a2e] text-white"
                      >
                        Review Order
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Review Order Step */}
                {currentStep === CheckoutStep.Review && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
                    
                    <div className="space-y-6">
                      {/* Shipping Information */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Shipping Information</h3>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setCurrentStep(CheckoutStep.ShippingInfo)}
                            className="text-[#D36C3F] h-8"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="bg-muted/20 rounded-lg p-4 text-sm">
                          <p className="font-medium">{watchedValues.fullName}</p>
                          <p>{watchedValues.email}</p>
                          <p>{watchedValues.phone}</p>
                          <p className="mt-2">{watchedValues.address}</p>
                          <p>{`${watchedValues.city}, ${watchedValues.state} ${watchedValues.zipCode}`}</p>
                        </div>
                      </div>
                      
                      {/* Payment Method */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Payment Method</h3>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setCurrentStep(CheckoutStep.PaymentMethod)}
                            className="text-[#D36C3F] h-8"
                          >
                            Edit
                          </Button>
                        </div>
                        <div className="bg-muted/20 rounded-lg p-4 text-sm flex items-center">
                          {watchedValues.paymentMethod === 'credit_card' ? (
                            <>
                              <CreditCard className="h-5 w-5 mr-2 text-[#708238]" />
                              <span>Credit / Debit Card (ending in 3456)</span>
                            </>
                          ) : (
                            <>
                              <Package className="h-5 w-5 mr-2 text-[#708238]" />
                              <span>Cash on Delivery</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Order Items */}
                      <div>
                        <h3 className="font-medium mb-2">Order Items</h3>
                        <div className="border rounded-lg divide-y">
                          {cart.items.map((item) => (
                            <div key={item.productId} className="flex items-center p-4 gap-4">
                              <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={goToPreviousStep}
                      >
                        Back to Payment
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-[#708238] hover:bg-[#5a6a2e] text-white"
                      >
                        Place Order
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            {currentStep !== CheckoutStep.Success && (
              <div className="lg:col-span-1">
                <div className="bg-card border rounded-lg p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({cart.totalItems} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-500">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-start space-x-2">
                      <Truck className="h-4 w-4 text-[#708238] mt-0.5 flex-shrink-0" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ShieldCheck className="h-4 w-4 text-[#708238] mt-0.5 flex-shrink-0" />
                      <span>Secure checkout with encrypted payment processing</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Order Success Step */}
            {currentStep === CheckoutStep.Success && (
              <div className="lg:col-span-3">
                <div className="bg-card border rounded-lg p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your order. We've received your order and will begin processing it soon.
                  </p>
                  
                  <div className="max-w-md mx-auto bg-muted/20 rounded-lg p-4 mb-6">
                    <p className="font-medium">Order #CRF-{Date.now().toString().slice(-8)}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      A confirmation email has been sent to {watchedValues.email}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild variant="outline">
                      <div onClick={() => navigate('/dashboard/orders')}>
                        View Order
                      </div>
                    </Button>
                    <Button 
                      asChild
                      className="bg-[#708238] hover:bg-[#5a6a2e] text-white"
                    >
                      <div onClick={() => navigate('/shop')}>
                        Continue Shopping
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;