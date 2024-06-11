import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from '/src/assets/logo.jpg';
import { ImSearch } from "react-icons/im";
import { AuthContext } from "./AuthProvider";
import { useCart } from "./CartProvider";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrCart } from "react-icons/gr";
import { GrSearch } from "react-icons/gr";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { state: { cartItems }, fetchCartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCartClick = () => {
    if (user) {
      navigate("/cart");
    } else {
      toast.error("Please login first");
      navigate("/login");
    }
  };

  const categories = [
    { title: "Personal Care", subCategory: "Personal Care" },
    { title: "Health Supplements", subCategory: "Supplements" },
    { title: "Women Care", subCategory: "Women Care" },
    { title: "Baby Care", subCategory: "Baby Care" },
    { title: "Health Devices", subCategory: "Health Devices" },

  ];

  const totalItemsInCart = user ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <div className="bg-white text-gray-900 z-50 w-full sticky top-0 shadow-lg">
      <header className="py-4 mx-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link to='/'>
            <img className="h-12" src={Logo} alt="Logo" />
          </Link>
          <Link to="/" className="md:block hidden text-xl md:text-3xl font-bold ml-1 font-PlayFair">
            <span className="text-[#14496b]">Medi</span><span className="text-[#8ccf28]">Mart</span>
          </Link>
          <div className="md:block hidden">
            {categories.map(({ title, subCategory, category }, index) => (
              <Link
                key={index}
                to={`/shop?subCategory=${subCategory || ''}&Category=${category || ''}`}
                className="text-gray-900 hover:text-[#125872] transition duration-300 text-center mx-[30px]"
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
        <div className="md:hidden flex text-gray-900">
          <button onClick={handleCartClick} className="font-bold py-2 rounded flex items-center relative ml-4">
            <GrCart className="text-2xl mr-[1rem] text-[#125872]" />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-1 -right-[0px] bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="focus:outline-none text-[#125872]">
            {mobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
        <nav className="hidden md:flex items-center ">
          <nav className="hidden md:flex ">
            <div className="flex gap-10 text-gray-900">
              <Link to="/shop" className="font-bold py-2 rounded flex items-center text-[#125872] relative mr-[0.5rem]">
                <GrSearch className="text-xl text-[#125872] mr-1" />Shop
              </Link>
            </div>
          </nav>
          <button onClick={handleCartClick} className="font-bold py-2 rounded flex items-center text-[#125872] relative mr-[0.5rem] ml-[10px]">
            <GrCart className="text-xl text-[#125872] mr-1" />Cart
            {totalItemsInCart > 0 && (
              <span className="absolute -top-[6px] -right-[-24px] bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </button>
          {user ? (
            <div className="relative inline-block text-left mr-[1rem]">
              <div className="flex items-center ml-[10px]">
                <button onClick={toggleDropdown} className="font-bold text-[#125872] py-2 rounded flex items-center relative mr-[0.5rem]">
                  <CgProfile className="text-2xl text-[#125872] mr-1" />User
                </button>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 h-[4rem] z-10 w-48 rounded-md bg-white shadow-lg">
                  <div>
                    <Link to="/profile" className="text-gray-700 px-4 py-2 text-sm">
                      {user.username}
                    </Link>
                    <br />
                    <button onClick={logout} className="text-gray-700 hover:text-red-600 w-full px-4 py-2 text-left text-sm">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="ml-2 flex items-center justify-center bg-[#125872] text-white font-bold py-2 md:px-8 px-[6px] rounded transition-colors duration-300">
                Login
              </button>
            </Link>
          )}
        </nav>
      </header>
      <div className={`fixed inset-0 z-50 overflow-hidden transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className={`absolute inset-0 bg-gray-900 opacity-50 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-50" : "opacity-0"}`} onClick={() => setMobileMenuOpen(false)}></div>
        <div className={`absolute left-0 w-3/4 max-w-xs h-screen bg-white shadow-lg transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="px-4 py-6 space-y-2">
            <Link to="/profile">
              <div className="flex items-center mb-4">
                <div className="bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center text-white font-semibold text-[8vw] pb-[1vw] mr-4">
                  {user?.username?.charAt(0)}
                </div>
                <p className="font-bold text-base">{user?.username}</p>
              </div>
            </Link>
            {user ? (
              <button onClick={logout} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-red-600 transition duration-300">
                Logout
              </button>
            ) : (
              <Link onClick={() => setMobileMenuOpen(false)} to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition duration-300">Login
              </Link>
            )}
            <Link to="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition duration-300" onClick={() => setMobileMenuOpen(false)}>
              Shop
            </Link>
            <div className="mt-4">

              {categories.map(({ title, subCategory, category }, index) => (
                <Link
                  key={index}
                  to={`/shop?subCategory=${subCategory || ''}&Category=${category || ''}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
