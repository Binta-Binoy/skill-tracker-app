import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  if (window.confirm("Are you sure you want to logout?")) {
    localStorage.removeItem('token');
    navigate('/login');
  }
};

  return (
    <nav>
      {/* other navbar items */}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
