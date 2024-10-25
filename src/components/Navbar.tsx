// components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/Site_1">Counter</Link> | 
      <Link to="/tanstack">Tanstack</Link> | 

    </nav>
  );
};

export default Navbar;
