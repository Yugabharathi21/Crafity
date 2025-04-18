import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Craftsman
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Connecting artisans with art lovers worldwide
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At Craftsman, we believe in preserving and promoting traditional craftsmanship
            while supporting local artisans. Our platform brings together talented
            craftspeople and appreciative customers, creating a marketplace where
            quality handcrafted goods can thrive.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
            <p className="text-gray-600">
              We ensure every product meets our high standards of craftsmanship and
              authenticity.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
            <p className="text-gray-600">
              We promote eco-friendly practices and sustainable materials in all
              our products.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
            <p className="text-gray-600">
              We foster a community of artisans and customers who share a passion
              for handmade goods.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-600 mb-8">
            Whether you're an artisan looking to showcase your work or a customer
            seeking unique handcrafted items, we'd love to have you join our
            community.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700"
            >
              Sign Up
            </Link>
            <Link
              to="/shop"
              className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-md font-medium border border-indigo-600 hover:bg-indigo-50"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;