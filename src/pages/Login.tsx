import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Login to Your Account</h1>
          <p className="text-gray-600 mb-6">Welcome back! Please enter your details.</p>
          {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Button type="primary" className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don't have an account? <Link to="/register" className="text-gray-600 font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
        <div className="hidden md:block w-1/2">
          <img src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Craftsman working" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
