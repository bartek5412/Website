// components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Prognoza Pogody</h1>
        <div>
          <Link to="/" className="text-white hover:text-blue-200 mx-4">
            Home
          </Link>
          <Link to="/Site_1" className="text-white hover:text-blue-200 mx-4">
            Counter
          </Link>
          <Link to="/tanstack" className="text-white hover:text-blue-200 mx-4">
            Tanstack
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
