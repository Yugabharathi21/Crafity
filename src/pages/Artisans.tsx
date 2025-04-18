import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import Button from '../components/Button';

interface Artisan {
  id: number;
  name: string;
  specialty: string;
  location: string;
  image: string;
  bio: string;
  rating: number;
  reviews: number;
  featured: boolean;
  products: number;
  followers: number;
}

const artisans: Artisan[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    specialty: 'Jewelry Making',
    location: 'San Francisco, CA',
    bio: 'Creating unique jewelry pieces inspired by nature and geometric patterns.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'John Smith',
    specialty: 'Pottery',
    location: 'Portland, OR',
    bio: 'Handcrafting functional and decorative pottery using traditional techniques.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Maria Garcia',
    specialty: 'Textile Weaving',
    location: 'Santa Fe, NM',
    bio: 'Weaving beautiful textiles using traditional looms and natural dyes.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'David Wilson',
    specialty: 'Woodworking',
    location: 'Seattle, WA',
    bio: 'Crafting fine furniture and decorative items from sustainably sourced wood.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    name: 'Yuki Tanaka',
    specialty: 'Glass Blowing',
    location: 'Austin, TX',
    bio: 'Creating unique glass art pieces using traditional Japanese techniques.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    name: 'Carlos Rodriguez',
    specialty: 'Leather Crafting',
    location: 'Miami, FL',
    bio: 'Handcrafting premium leather goods using traditional techniques.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
];

const Artisans: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Our Artisans</h1>
          <p className="mt-2 text-sm text-gray-700">
            Meet the talented artisans behind our handcrafted items
          </p>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {artisans.map((artisan) => (
            <div
              key={artisan.id}
              className="group relative bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="relative h-80 w-full">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{artisan.name}</h3>
                <p className="mt-1 text-sm text-indigo-600">{artisan.specialty}</p>
                <p className="mt-1 text-sm text-gray-500">{artisan.location}</p>
                <p className="mt-2 text-sm text-gray-700">{artisan.bio}</p>
                <div className="mt-4">
                  <Link
                    to={`/shop?artisan=${artisan.id}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    View Artisan's Work
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artisans;