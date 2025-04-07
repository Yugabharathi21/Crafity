import React from 'react';
import { Heart, Users, Shield, Truck } from 'lucide-react';
import Button from '../components/Button';

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart size={32} />,
      title: "Handcrafted with Love",
      description: "Every item in our marketplace is created with passion and attention to detail by skilled artisans."
    },
    {
      icon: <Users size={32} />,
      title: "Supporting Artisans",
      description: "We provide a platform for artisans to showcase their work and connect with customers who value handcrafted quality."
    },
    {
      icon: <Shield size={32} />,
      title: "Quality Guaranteed",
      description: "All products are carefully reviewed to ensure they meet our high standards of craftsmanship."
    },
    {
      icon: <Truck size={32} />,
      title: "Sustainable Practices",
      description: "We promote eco-friendly materials and sustainable production methods."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "Sarah founded Craftify with a vision to create a platform that celebrates artisanal craftsmanship."
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "Michael ensures that our platform provides the best experience for both artisans and customers."
    },
    {
      name: "Emily Rodriguez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      bio: "Emily leads our creative team and helps artisans showcase their work beautifully."
    }
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <h1>Our Story</h1>
          <p>Connecting artisans with people who appreciate handcrafted quality</p>
        </div>
      </div>

      <div className="container">
        <section className="about-section mission">
          <h2>Our Mission</h2>
          <div className="mission-content">
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
                alt="Artisan working"
              />
            </div>
            <div className="mission-text">
              <p>
                At Craftify, we believe in the power of handmade. Our mission is to create a thriving marketplace where skilled artisans can showcase their craft and connect with customers who value quality, uniqueness, and traditional craftsmanship.
              </p>
              <p>
                We're committed to preserving traditional crafting techniques while embracing innovation, ensuring that artisanal craftsmanship continues to evolve and flourish in the modern world.
              </p>
              <Button type="secondary">Learn More</Button>
            </div>
          </div>
        </section>

        <section className="about-section values">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div className="value-card" key={index}>
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section join-us">
          <div className="join-content">
            <h2>Join Our Community</h2>
            <p>
              Whether you're an artisan looking to share your craft or a customer seeking unique, handmade items, we'd love to have you join our community.
            </p>
            <div className="join-buttons">
              <Button>Become an Artisan</Button>
              <Button type="secondary">Start Shopping</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;