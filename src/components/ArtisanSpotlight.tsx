import React from 'react';
import Button from './Button';

interface Artisan {
  id: number;
  name: string;
  specialty: string;
  location: string;
  image: string;
  bio: string;
}

const ArtisanSpotlight: React.FC = () => {
  const artisans: Artisan[] = [
    {
      id: 1,
      name: "Maria Gonzalez",
      specialty: "Pottery",
      location: "Santa Fe, NM",
      image: "https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "Maria has been creating pottery for over 20 years, drawing inspiration from her cultural heritage and natural surroundings."
    },
    {
      id: 2,
      name: "James Wilson",
      specialty: "Woodworking",
      location: "Portland, OR",
      image: "https://images.unsplash.com/photo-1572863141204-83031c77e65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "James creates sustainable wooden furniture and home goods using traditional techniques passed down through generations."
    },
    {
      id: 3,
      name: "Amara Okafor",
      specialty: "Textile Art",
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "Amara weaves contemporary designs with traditional African patterns to create unique textiles and wearable art."
    }
  ];

  return (
    <section className="artisan-spotlight section">
      <div className="container">
        <h2 className="section-title">Meet Our Artisans</h2>
        <div className="artisans-grid">
          {artisans.map(artisan => (
            <div className="artisan-card" key={artisan.id}>
              <div className="artisan-image">
                <img src={artisan.image} alt={artisan.name} />
              </div>
              <div className="artisan-info">
                <h3 className="artisan-name">{artisan.name}</h3>
                <p className="artisan-specialty">{artisan.specialty}</p>
                <p className="artisan-location">{artisan.location}</p>
                <p className="artisan-bio">{artisan.bio}</p>
                <Button className="artisan-btn">View Collection</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all">
          <Button type="secondary">Meet All Artisans</Button>
        </div>
      </div>
    </section>
  );
};

export default ArtisanSpotlight;