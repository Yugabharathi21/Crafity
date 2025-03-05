import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function RegisterPage() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'buyer' as 'buyer' | 'seller'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // Show error
      return;
    }
    try {
      await register(formData.email, formData.password, formData.name, formData.role);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">{t('auth.register.title')}</h1>
            <p className="text-muted-foreground">{t('auth.register.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">{t('common.fullName')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('auth.register.namePlaceholder')}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">{t('common.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t('auth.register.emailPlaceholder')}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">{t('common.password')}</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={t('auth.register.passwordPlaceholder')}
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">{t('common.confirmPassword')}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder={t('auth.register.confirmPasswordPlaceholder')}
                required
              />
            </div>

            <div>
              <Label>{t('auth.register.accountType')}</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as 'buyer' | 'seller' })}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buyer" id="buyer" />
                  <Label htmlFor="buyer">{t('auth.register.buyer')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="seller" id="seller" />
                  <Label htmlFor="seller">{t('auth.register.seller')}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" required />
              <span className="text-sm">{t('auth.register.termsAgreement')}</span>
            </div>

            <Button type="submit" className="w-full">
              {t('auth.register.registerButton')}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t('auth.register.alreadyHaveAccount')}</span>{' '}
              <a href="/login" className="text-primary hover:underline">
                {t('auth.register.login')}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}