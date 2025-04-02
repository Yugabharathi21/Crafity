import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h1>Craftify</h1>
          </Link>
        </div>

        <div className="navbar-search">
          <div className="search-container">
            <input type="text" placeholder="Search for handcrafted items..." />
            <button className="search-btn">
              <Search size={20} />
            </button>
          </div>
        </div>

        <nav className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/shop">Shop</Link></li>
            <li className="nav-item"><Link to="/categories">Categories</Link></li>
            <li className="nav-item"><Link to="/artisans">Artisans</Link></li>
            <li className="nav-item"><Link to="/about">About</Link></li>
          </ul>
        </nav>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/dashboard" className="navbar-icon">
                <User size={24} />
              </Link>
              <Link to="/cart" className="navbar-icon cart-icon">
                <ShoppingCart size={24} />
                <span className="cart-count">0</span>
              </Link>
            </>
          ) : (
            <Link to="/login" className="navbar-icon">
              <User size={24} />
            </Link>
          )}
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
