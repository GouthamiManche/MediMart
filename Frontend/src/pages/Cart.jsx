import React, { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    // console.log(storedCartItems);
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
    <div>
      <div className="flex justify-between mx-auto max-w-7xl py-8">
        {/* Order Summary */}
        <div className="w-3/5">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="bg-white rounded-md shadow-md p-4">
            {cartItems.map((item, index) => (
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
                    {/* <select className="mt-2 border rounded-md px-2 py-1">
                      <option value="">Test</option>
                    </select> */}
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">{`₹${item.Price}`}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded-md px-2 py-1">
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
                      className="ml-4 text-gray-500 hover:text-gray-800"
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      <BsTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment and Summary */}
        <div className="w-2/5 ml-8">
          <h2 className="text-2xl font-bold mb-4">Order Total</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
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
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full py-3 rounded-md mt-4">
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
