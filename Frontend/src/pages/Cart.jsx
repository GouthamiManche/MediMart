import React, { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import Category from './Category';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [itemsToRender, setItemsToRender] = useState([]);

  useEffect(() => {
    setItemsToRender(cartItems);
  }, [cartItems]);

  const handleAddToCart = (product, quantity) => {
    const newCartItem = {
      ...product,
      quantity,
    };
    setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
  };

  return (
    <div>
      <Category handleAddToCart={handleAddToCart} />

      <div className="flex justify-between mx-auto max-w-7xl py-8">
        {/* Order Summary */}
        <div className="w-3/5">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {itemsToRender.map((item, index) => (
              <div key={index} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={item.Image_URL}
                    alt={item.isMedicine ? item.Medicine_Name : item.Name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">
                      {item.isMedicine ? item.Medicine_Name : item.Name}
                    </h3>
                    <select className="mt-2 border rounded-md px-2 py-1">
                      <option value="">Test</option>
                    </select>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">{`₹${item.Price}`}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded-md px-2 py-1">
                      <button className="text-gray-500 hover:text-gray-800">-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button className="text-gray-500 hover:text-gray-800">+</button>
                    </div>
                    <p className="ml-4 font-semibold">{`₹${item.Price * item.quantity}`}</p>
                    <button className="ml-4 text-gray-500 hover:text-gray-800">
                      <BsTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Delivery Options */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Delivery Options</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="radio" name="delivery" id="free" className="mr-2" />
                  <label htmlFor="free" className="text-lg font-semibold">
                    FREE
                  </label>
                </div>
                <p className="text-gray-500">Standard delivery</p>
                <p className="text-gray-500">Est. arrival: 03.06.04</p>
              </div>
            </div>
          </div>
          {/* Customer Information */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="mb-4">
                <label htmlFor="name" className="block font-semibold mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  value="Amber Dunne"
                  className="w-full border rounded-md px-4 py-2"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block font-semibold mb-2">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value="775-123-4567"
                  className="w-full border rounded-md px-4 py-2"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block font-semibold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value="4705 Peace Street, Bayville, New Jersey(NJ)"
                  className="w-full border rounded-md px-4 py-2"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment and Summary */}
        <div className="w-2/5 ml-8">
          <h2 className="text-2xl font-bold mb-4">Payment method</h2>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40x40"
                  alt="Mastercard"
                  className="w-10 h-10"
                />
                <p className="ml-4 font-semibold">Mastercard</p>
              </div>
              <button className="text-blue-500 hover:text-blue-700">
                Change payment method
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="voucher" className="block font-semibold mb-2">
                Voucher
              </label>
              <input
                type="text"
                id="voucher"
                placeholder="Enter voucher code"
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md">
              Apply
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Summary</h2>
            <div className="flex justify-between mb-2">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-semibold">
                {`₹${itemsToRender.reduce((total, item) => total + item.Price * item.quantity, 0)}`}
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
                {`₹${itemsToRender.reduce((total, item) => total + item.Price * item.quantity, 0)}`}
              </p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full py-3 rounded-md mt-4">
              Proceed to payment
            </button>
          </div>
        </div>
      </div>    </div>
  );
};

export default Cart;