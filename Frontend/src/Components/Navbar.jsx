import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCartPlus, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [user, setUser] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className=" bg-white text-gray-900 ">
      <header className="container mx-auto py-4 px-6 flex items-center justify-between ">
        <div className="flex items-center text-gray-900">
          <Link to="/" className="text-xl md:text-3xl font-bold transition duration-300 ease-in-out transform hover:scale-110 hover:text-black">
            MEDIMART
          </Link>
          <nav className="hidden md:flex md:ml-[18vw]">
            <div className="flex gap-10 text-gray-900">
              <Link to="/" className="transition duration-300 ease-in-out transform hover:scale-110 hover:text-black">Home</Link>
              <Link to="/shop" className="transition duration-300 ease-in-out transform hover:scale-110 hover:text-black">Shop</Link>
              <Link to="/about" className="transition duration-300 ease-in-out transform hover:scale-110 hover:text-black">About</Link>
              <Link to="/contact" className="transition duration-300 ease-in-out transform hover:scale-110 hover:text-black">Contact</Link>
            </div>
          </nav>
        </div>
        <div className="md:hidden text-gray-900">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
        <nav className="hidden md:flex items-center gap-4">
         
          <Link to="/cart" className="font-bold py-2 rounded flex items-center transition duration-300 ease-in-out transform hover:scale-110 hover:text-black">
            <FaCartPlus className="text-xl" />
            <span className="text-lg ml-1">Cart</span>
          </Link>
          <Link className="py-2 px-4 font-bold text-lg transition duration-300 ease-in-out transform hover:scale-110 hover:text-black" to="/login">Login</Link>
          {user && (
            <div className='text-gray-900'>
              <h3 className="font-bold py-2">{user.name}</h3>
            </div>
          )}
        </nav>
      </header>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white text-gray-900">
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
