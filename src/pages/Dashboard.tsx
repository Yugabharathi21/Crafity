import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Spinner } from '../components/Spinner';

const Dashboard = () => {
  const { user, loading: authLoading, logout, uploadProfileImage } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const imageUrl = await uploadProfileImage(file);
      console.log('Profile image uploaded:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (authLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
          <p className="text-gray-600">Email: {user?.email}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Profile Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-2"
            disabled={isUploading}
          />
          {isUploading && <Spinner />}
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;