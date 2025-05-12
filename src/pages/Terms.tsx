import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          asChild
        >
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: March 20, 2024</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Craftify's website and services, you acknowledge that you have read,
                understood, and agree to be bound by these Terms of Service. If you do not agree to these
                terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
              <p className="text-muted-foreground mb-4">
                To access certain features of our platform, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your account information</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Product Information</h2>
              <p className="text-muted-foreground mb-4">
                We strive to provide accurate product descriptions, pricing, and availability information.
                However, we reserve the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Modify product information without notice</li>
                <li>Limit order quantities</li>
                <li>Refuse or cancel orders at our discretion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Pricing and Payment</h2>
              <p className="text-muted-foreground mb-4">
                All prices are listed in USD and are subject to change without notice. We accept various
                payment methods and ensure secure transaction processing. You agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Pay all charges at the prices in effect when incurred</li>
                <li>Pay all applicable taxes</li>
                <li>Use valid and authorized payment methods</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground">
                Shipping times and costs vary by location and selected shipping method. While we strive
                to meet estimated delivery dates, delays may occur due to circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Returns and Refunds</h2>
              <p className="text-muted-foreground">
                We offer a 30-day return policy for most items. Products must be unused and in original
                packaging. Refunds will be processed to the original payment method within 5-7 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on our website, including text, graphics, logos, and images, is protected by
                copyright and other intellectual property laws. You may not use, reproduce, or distribute
                our content without explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Craftify shall not be liable for any indirect, incidental, special, consequential, or
                punitive damages arising from your use of our services or any products purchased through
                our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective
                immediately upon posting to our website. Your continued use of our services constitutes
                acceptance of any modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4">
                <p className="text-muted-foreground">Email: legal@craftify.com</p>
                <p className="text-muted-foreground">Phone: (555) 123-4567</p>
                <p className="text-muted-foreground">Address: 123 Artisan Way, Craft City, ST 12345</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;