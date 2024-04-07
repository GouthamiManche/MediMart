import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { FaCartPlus, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {

  const [user, setUser] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to get user information
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUsername(decodedToken.username);
      setShowLogin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    setShowLogin(true);
  };

  return (
    <div className=" bg-white text-gray-900 z-50 w-full">
      <header className="container mx-auto py-4 px-6 flex items-center justify-between ">
        <div className="flex items-center ">
          <img className="size-12"src="/src/Images/logo.jpg"></img>
          <Link to="/" className="text-xl md:text-3xl font-bold ">
          <span className="text-blue-900">MEDI</span><span className="text-lime-600">MART</span> 
          </Link>
          <nav className="hidden md:flex md:ml-[18vw]">
            <div className="flex gap-10  text-blue-900">
              <Link to="/" className="">Home</Link>
              <Link to="/shop" className="">Shop</Link>
              <Link to="/about" className="">About</Link>
              <Link to="/contact" className="">Contact</Link>
            </div>
          </nav>
        </div>
        <div className="md:hidden text-blue-900">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
        <nav className="hidden md:flex items-center gap-4">

          <Link to="/cart" className="font-bold py-2 rounded flex items-center text-blue-900">
            <FaCartPlus className="text-xl "/>
            <span className="text-lg ml-2">Cart</span>
          </Link>
          {showLogin ? (
      
        <div>
          <Link
            className="py-2 px-4 font-bold text-lg text-blue-900"
            to="/login"
          >
            Login
          </Link>
        </div>
      ) : (
    
        <div className="relative inline-block text-left">
          <div className="flex items-center">
            <p className="py-2 px-4 font-bold text-lg text-blue-900">{username}</p>
            <button onClick={toggleDropdown} className="">
          <CgProfile className="size-9 ml-2 text-blue-900" />
          </button>
          </div>
          
          {dropdownOpen && (
            // Dropdown menu
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div>
                <Link to="/profile" className="text-blue-900 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
                  Profile
                </Link>
                <Link to="/" onClick={handleLogout} type="submit" className="text-blue-900 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
          
        </nav>
      </header>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white  text-blue-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500" onClick={() => setMobileMenuOpen(false)}>Contact</Link>

          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
