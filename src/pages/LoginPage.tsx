import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container max-w-md py-12">
      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">{t('auth.login.title')}</h1>
            <p className="text-muted-foreground">{t('auth.login.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t('common.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.login.emailPlaceholder')}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">{t('common.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.login.passwordPlaceholder')}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm">{t('auth.login.rememberMe')}</span>
              </label>
              <a href="/forgot-password" className="text-sm text-primary hover:underline">
                {t('auth.login.forgotPassword')}
              </a>
            </div>

            <Button type="submit" className="w-full">
              {t('auth.login.loginButton')}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t('auth.login.noAccount')}</span>{' '}
              <a href="/register" className="text-primary hover:underline">
                {t('auth.login.signUp')}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}