import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isArtisan, setIsArtisan] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  const { register, user, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    await register(name, email, password, isArtisan);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="flex-1 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Create an Account</h1>
          <p className="text-gray-600 mb-6">Join our community of craft enthusiasts and artisans.</p>
          
          {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a password"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isArtisan"
                checked={isArtisan}
                onChange={(e) => setIsArtisan(e.target.checked)}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <label htmlFor="isArtisan" className="text-gray-700">I am an artisan/craftsperson</label>
            </div>
            
            <div className="mt-4">
              <Button type="primary" className="w-full py-2" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </div>
          </form>
          
          <p className="text-center text-gray-600 mt-4">Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link></p>
        </div>
        
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1621600411688-4be93c2c1208?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            alt="Handcrafted items"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;