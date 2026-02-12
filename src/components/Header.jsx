import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Gamepad2, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { getCartCount } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          <Gamepad2 size={32} className="logo-icon" />
          <span className="logo-text">
            Gamer<span className="highlight">Hub</span>
          </span>
        </Link>

        <div className="search-bar">
          <Search size={20} className="search-icon" onClick={handleSearch} style={{ cursor: 'pointer' }} />
          <input
            type="text"
            placeholder="Search gear..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <nav className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/shop" className="nav-item">Shop</Link>
          <Link to="/hub" className="nav-item">Community</Link>
        </nav>

        <div className="header-actions">
          <button className="icon-btn">
            <User size={24} />
          </button>

          <Link to="/cart" className="icon-btn cart-btn">
            <ShoppingCart size={24} />
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
