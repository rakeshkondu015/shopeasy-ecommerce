import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">🛒 ShopEasy</Link>

      <div className="navbar-links">
        <Link to="/">Products</Link>

        {!user && <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>}

        {user && user.role === 'USER' && <>
          <Link to="/cart">Cart</Link>
        </>}

        {user && user.role === 'ADMIN' && <>
          <Link to="/admin">Admin Panel</Link>
        </>}

        {user && (
          <div className="navbar-user">
            <span>Hi, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
