import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <h1>Craftify</h1>
          </a>
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
            <li className="nav-item"><a href="/">Home</a></li>
            <li className="nav-item"><a href="/shop">Shop</a></li>
            <li className="nav-item"><a href="/categories">Categories</a></li>
            <li className="nav-item"><a href="/artisans">Artisans</a></li>
            <li className="nav-item"><a href="/about">About</a></li>
          </ul>
        </nav>

        <div className="navbar-actions">
          <a href="/account" className="navbar-icon">
            <User size={24} />
          </a>
          <a href="/cart" className="navbar-icon cart-icon">
            <ShoppingCart size={24} />
            <span className="cart-count">0</span>
          </a>
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;