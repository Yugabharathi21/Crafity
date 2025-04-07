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

const Artisans: React.FC = () => {
  const artisans: Artisan[] = [
    {
      id: 1,
      name: "Maria Gonzalez",
      specialty: "Pottery",
      location: "Santa Fe, NM",
      image: "https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "Maria has been creating pottery for over 20 years, drawing inspiration from her cultural heritage and natural surroundings.",
      rating: 4.9,
      reviews: 128,
      featured: true,
      products: 45,
      followers: 1200
    },
    {
      id: 2,
      name: "James Wilson",
      specialty: "Woodworking",
      location: "Portland, OR",
      image: "https://images.unsplash.com/photo-1572863141204-83031c77e65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "James creates sustainable wooden furniture and home goods using traditional techniques passed down through generations.",
      rating: 4.8,
      reviews: 95,
      featured: true,
      products: 32,
      followers: 850
    },
    {
      id: 3,
      name: "Amara Okafor",
      specialty: "Textile Art",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "Amara weaves contemporary designs with traditional African patterns to create unique textiles and wearable art.",
      rating: 4.9,
      reviews: 156,
      featured: true,
      products: 28,
      followers: 1500
    },
    {
      id: 4,
      name: "David Chen",
      specialty: "Jewelry",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "David specializes in creating unique, handcrafted jewelry pieces that blend modern design with traditional metalworking techniques.",
      rating: 4.7,
      reviews: 82,
      featured: true,
      products: 56,
      followers: 920
    },
    {
      id: 5,
      name: "Emma Thompson",
      specialty: "Glasswork",
      location: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "Emma creates stunning hand-blown glass pieces, from functional items to artistic sculptures.",
      rating: 4.8,
      reviews: 74,
      featured: false,
      products: 38,
      followers: 680
    },
    {
      id: 6,
      name: "Carlos Rodriguez",
      specialty: "Leatherwork",
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "Carlos crafts premium leather goods using traditional techniques and sustainably sourced materials.",
      rating: 4.9,
      reviews: 108,
      featured: false,
      products: 42,
      followers: 950
    }
  ];

  return (
    <div className="artisans-page">
      <div className="artisans-header">
        <div className="container">
          <h1>Meet Our Artisans</h1>
          <p>Discover the talented craftspeople behind our handmade products</p>
        </div>
      </div>

      <div className="container">
        <div className="featured-artisans">
          <h2>Featured Artisans</h2>
          <div className="artisans-grid featured">
            {artisans.filter(artisan => artisan.featured).map(artisan => (
              <div className="artisan-card featured" key={artisan.id}>
                <div className="artisan-image">
                  <img src={artisan.image} alt={artisan.name} />
                </div>
                <div className="artisan-content">
                  <h3>{artisan.name}</h3>
                  <p className="artisan-specialty">{artisan.specialty}</p>
                  <p className="artisan-location">
                    <MapPin size={16} />
                    <span>{artisan.location}</span>
                  </p>
                  <div className="artisan-rating">
                    <Star size={16} />
                    <span>{artisan.rating}</span>
                    <span className="reviews">({artisan.reviews} reviews)</span>
                  </div>
                  <p className="artisan-bio">{artisan.bio}</p>
                  <div className="artisan-stats">
                    <div className="stat">
                      <span className="value">{artisan.products}</span>
                      <span className="label">Products</span>
                    </div>
                    <div className="stat">
                      <span className="value">{artisan.followers}</span>
                      <span className="label">Followers</span>
                    </div>
                  </div>
                  <div className="artisan-actions">
                    <Button>View Collection</Button>
                    <Button type="secondary">Follow</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="all-artisans">
          <h2>All Artisans</h2>
          <div className="artisans-grid">
            {artisans.filter(artisan => !artisan.featured).map(artisan => (
              <div className="artisan-card" key={artisan.id}>
                <div className="artisan-image">
                  <img src={artisan.image} alt={artisan.name} />
                </div>
                <div className="artisan-content">
                  <h3>{artisan.name}</h3>
                  <p className="artisan-specialty">{artisan.specialty}</p>
                  <p className="artisan-location">
                    <MapPin size={16} />
                    <span>{artisan.location}</span>
                  </p>
                  <div className="artisan-rating">
                    <Star size={16} />
                    <span>{artisan.rating}</span>
                    <span className="reviews">({artisan.reviews} reviews)</span>
                  </div>
                  <p className="artisan-bio">{artisan.bio}</p>
                  <div className="artisan-actions">
                    <Button>View Collection</Button>
                    <Button type="secondary">Follow</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artisans;