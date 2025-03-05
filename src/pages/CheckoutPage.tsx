import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { items, total } = useCart();
  const [step, setStep] = useState(1);

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Information */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{t('checkout.contactInformation')}</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">{t('common.firstName')}</Label>
                    <Input id="firstName" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t('common.lastName')}</Label>
                    <Input id="lastName" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">{t('common.email')}</Label>
                  <Input id="email" type="email" />
                </div>
                <div>
                  <Label htmlFor="phone">{t('common.phoneNumber')}</Label>
                  <Input id="phone" type="tel" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{t('checkout.shippingInformation')}</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">{t('common.address')}</Label>
                  <Input id="address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">{t('common.city')}</Label>
                    <Input id="city" />
                  </div>
                  <div>
                    <Label htmlFor="state">{t('common.state')}</Label>
                    <Input id="state" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country">{t('common.country')}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="postalCode">{t('common.postalCode')}</Label>
                    <Input id="postalCode" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{t('checkout.paymentInformation')}</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">{t('checkout.cardNumber')}</Label>
                  <Input id="cardNumber" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="expiryDate">{t('checkout.expiryDate')}</Label>
                    <Input id="expiryDate" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">{t('checkout.cvv')}</Label>
                    <Input id="cvv" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nameOnCard">{t('checkout.nameOnCard')}</Label>
                  <Input id="nameOnCard" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{t('checkout.orderSummary')}</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>{t('checkout.subtotal')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('checkout.shipping')}</span>
                  <span>{t('checkout.shippingCalculated')}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('checkout.tax')}</span>
                  <span>{t('checkout.taxCalculated')}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>{t('checkout.total')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full">{t('checkout.placeOrder')}</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}