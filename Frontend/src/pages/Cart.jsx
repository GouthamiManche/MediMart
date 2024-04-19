import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { BsTrash } from 'react-icons/bs';
import HorizontalCardScroll from '../Components/HorizontalCardScroll';
import LoadingGif from "../Components/LoadingGif";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const product = location.state;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("https://medicine-website-two.vercel.app/api/products?category=Other", {
          headers: {
            apikey: "123",
          },
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false); // Set loading to false after fetching (even on errors)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const handleRemoveFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleQuantityChange = (index, value) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = Math.max(1, value);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
  };

  return (
    <div className=''>
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex justify-between mx-auto max-w-7xl py-8 ">
          {/* Order Summary */}
          <div className="w-3/5">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="bg-white p-4 ">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 mt-[6rem] ml-[4rem] text-center">Your cart is empty.</p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex items-center border rounded-md border-gray-300 mb-4">
                    <div className="flex  ml-[2rem] items-center justify-center w-24 h-24 border border-gray-300 my-[1rem]">
                      <img
                        src={item.Image_URL}
                        alt={item.isMedicine ? item.Medicine_Name : item.Name}
                        className="max-w-full h-24 "
                      />
                    </div>
                    <div className='ml-[2rem]'>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {item.isMedicine ? item.Medicine_Name : item.Name}
                        </h3>
                      </div>

                      <p className=''>{item.Manufacturer}</p>
                      <p className="text-lg  font-semibold">{`₹${item.Price}`}</p>
                    </div>
                    <div className="flex items-center mr-[2rem] ml-auto mt-2 gap-2">
                      <div className="flex items-center border rounded-md px-2  py-1">
                        <button
                          className="text-gray-500 hover:text-gray-800"
                          onClick={() => handleQuantityChange(index, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="text-gray-500 hover:text-gray-800"
                          onClick={() => handleQuantityChange(index, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <p className="ml-4 font-semibold">{`₹${item.Price * item.quantity}`}</p>
                      <button
                        className="ml-4 text-red-400 hover:text-red-600"
                        onClick={() => handleRemoveFromCart(index)}
                      >
                        <BsTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment and Summary */}
          <div className="w-[30%] p-[2rem] h-full  border border-gray-300 sticky top-10 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Order Total</h2>
            <div className="bg-white">
              <div className="flex justify-between mb-2">
                <p className="text-gray-500">Subtotal</p>
                <p className="font-semibold">
                  {`₹${cartItems.reduce((total, item) => total + item.Price * item.quantity, 0)}`}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-500">Discount</p>
                <p className="font-semibold">-₹0</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-500">Delivery Fee</p>
                <p className="font-semibold">₹0</p>
              </div>
              <div className="border-t border-gray-300 pt-4 flex justify-between">
                <p className="font-bold">Total</p>
                <p className="font-bold">
                  {`₹${cartItems.reduce((total, item) => total + item.Price * item.quantity, 0)}`}
                </p>
              </div>
              <button className="bg-[#125872]  text-white font-semibold w-full py-3 rounded-md mt-4">
                Proceed to payment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="bg-white rounded-md  mb-4">
                <div className="flex items-center p-4 border-b border-gray-200">
                  <div className="w-1/3">
                    <img
                      src={item.Image_URL}
                      alt={item.isMedicine ? item.Medicine_Name : item.Name}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <div className="w-2/3 pl-4">
                    <h3 className="text-lg font-semibold">
                      {item.isMedicine ? item.Medicine_Name : item.Name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.Manufacturer}</p>
                    <p className="text-lg font-semibold">{`₹${item.Price}`}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4">
                  <div className="flex items-center">
                    <button
                      className="text-gray-500 hover:text-gray-800"
                      onClick={() => handleQuantityChange(index, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="text-gray-500 hover:text-gray-800"
                      onClick={() => handleQuantityChange(index, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{`₹${item.Price * item.quantity}`}</p>
                  </div>
                  <div>
                    <button
                      className="text-red-400 hover:text-red-600"
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      <BsTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          {cartItems.length > 0 && (
            <div className="bg-white rounded-md  p-4">
              <h2 className="text-2xl font-bold mb-4">Order Total</h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-500">Subtotal</p>
                <p className="font-semibold">
                  {`₹${getCartTotal()}`}
                </p>
              </div>
              <button className="bg-[#125872] text-white font-semibold w-full   py-3 rounded-md">
                Proceed to payment
              </button>
            </div>
          )}
        </div>
      </div>

      
      {isLoading ? (
            <LoadingGif />
          ) : (
            <div className='md:mt-[2rem]'>
              <HorizontalCardScroll itemForHorizontalScroll={items} />
            
            </div>
          )}
    </div>
  );
};

export default Cart;
