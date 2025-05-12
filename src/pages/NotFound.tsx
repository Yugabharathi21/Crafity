import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center">
      <Package className="h-16 w-16 text-[#708238] mb-6" />
      
      <h1 className="text-7xl font-bold text-foreground mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
      
      <p className="text-muted-foreground text-center max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="outline">
          <Link to="/contact">
            Contact Support
          </Link>
        </Button>
        
        <Button asChild className="bg-[#708238] hover:bg-[#5a6a2e] text-white">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;