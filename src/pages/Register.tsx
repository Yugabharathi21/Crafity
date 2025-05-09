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
  const [emailError, setEmailError] = useState('');
  
  const { register, user, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

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
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword();
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    await register(name, email.trim(), password, isArtisan);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-container">
          <h1 className="auth-title">Create an Account</h1>
          <p className="auth-subtitle">Join our community of craft enthusiasts and artisans.</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                required
                placeholder="Enter your email"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) validatePassword();
                }}
                required
                placeholder="Create a password"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (passwordError) validatePassword();
                }}
                required
                placeholder="Confirm your password"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="isArtisan"
                checked={isArtisan}
                onChange={(e) => setIsArtisan(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="isArtisan">I am an artisan/craftsperson</label>
            </div>
            
            <div className="form-action">
              <Button type="primary" className="auth-button" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </div>
          </form>
          
          <div className="auth-redirect">
            <p>Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-700">Login</Link></p>
          </div>
        </div>
        
        <div className="auth-image">
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