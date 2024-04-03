import React from 'react';
import { Link } from 'react-router-dom';

const AuthButton = ({ isAuthenticated, username, handleLogout }) => {
  return isAuthenticated ? (
    <button className="py-2 px-4 font-bold text-lg transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500" onClick={handleLogout}>
      Sign Out ({username})
    </button>
  ) : (
    <Link className="py-2 px-4 font-bold text-lg transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500" to="/login">Login</Link>
  );
};

export default AuthButton;
