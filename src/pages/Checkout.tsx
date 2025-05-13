
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, ArrowLeft, ChevronsUpDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (cart.length === 0 && !paymentComplete) {
    return <Navigate to="/cart" />;
  }

  const onSubmit = (data: any) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      clearCart();
      toast.success("Payment successful! Your order has been placed.");
    }, 2000);
  };
  
  if (paymentComplete) {
    return (
      <div className="container py-16 min-h-[50vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
        <p className="text-center text-muted-foreground mb-6 max-w-md">
          Thank you for your purchase! Your order has been confirmed and will be shipped soon.
        </p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500">{errors.firstName.message as string}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500">{errors.lastName.message as string}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email"
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message as string}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    {...register("phone", { required: "Phone number is required" })}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message as string}</p>
                  )}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address"
                    {...register("address", { required: "Address is required" })}
                  />
                  {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message as string}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city"
                    {...register("city", { required: "City is required" })}
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city.message as string}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                  <Input 
                    id="zipCode"
                    {...register("zipCode", { required: "ZIP code is required" })}
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-red-500">{errors.zipCode.message as string}</p>
                  )}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-md flex items-start gap-4">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    checked
                    readOnly
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor="card" className="flex items-center gap-2 font-medium">
                      <CreditCard className="h-4 w-4" /> Credit/Debit Card
                    </label>
                    
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          {...register("cardNumber", { 
                            required: "Card number is required", 
                            pattern: { 
                              value: /^[0-9]{16}$/, 
                              message: "Please enter a valid 16-digit card number" 
                            } 
                          })}
                        />
                        {errors.cardNumber && (
                          <p className="text-sm text-red-500">{errors.cardNumber.message as string}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 space-y-2">
                          <Label htmlFor="expMonth">Month</Label>
                          <div className="relative">
                            <select
                              id="expMonth"
                              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm appearance-none"
                              {...register("expMonth", { required: "Required" })}
                            >
                              {Array.from({ length: 12 }, (_, i) => {
                                const month = i + 1;
                                return (
                                  <option key={month} value={month.toString().padStart(2, '0')}>
                                    {month.toString().padStart(2, '0')}
                                  </option>
                                );
                              })}
                            </select>
                            <ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                          </div>
                        </div>
                        
                        <div className="col-span-1 space-y-2">
                          <Label htmlFor="expYear">Year</Label>
                          <div className="relative">
                            <select
                              id="expYear"
                              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm appearance-none"
                              {...register("expYear", { required: "Required" })}
                            >
                              {Array.from({ length: 10 }, (_, i) => {
                                const year = new Date().getFullYear() + i;
                                return (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                );
                              })}
                            </select>
                            <ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                          </div>
                        </div>
                        
                        <div className="col-span-1 space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv"
                            type="password" 
                            placeholder="123"
                            maxLength={4}
                            {...register("cvv", { 
                              required: "CVV is required", 
                              pattern: { 
                                value: /^[0-9]{3,4}$/, 
                                message: "Please enter a valid CVV" 
                              } 
                            })}
                          />
                          {errors.cvv && (
                            <p className="text-sm text-red-500">{errors.cvv.message as string}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input 
                          id="nameOnCard"
                          {...register("nameOnCard", { required: "Name on card is required" })}
                        />
                        {errors.nameOnCard && (
                          <p className="text-sm text-red-500">{errors.nameOnCard.message as string}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-between pt-4">
              <Link to="/cart">
                <Button type="button" variant="outline" className="gap-2">
                  <ArrowLeft size={16} /> Return to Cart
                </Button>
              </Link>
              <Button type="submit" disabled={isProcessing} className="min-w-[150px]">
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="lg:w-1/3">
          <div className="rounded-lg border p-6 bg-muted/10 space-y-4 sticky top-20">
            <h3 className="text-lg font-bold">Order Summary</h3>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-medium line-clamp-2">{item.title}</h4>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                      <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${(subtotal * 0.08).toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold pt-1">
                <span>Total</span>
                <span>${(subtotal + subtotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
