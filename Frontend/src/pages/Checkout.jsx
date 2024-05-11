import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SiPhonepe } from 'react-icons/si';
import { AuthContext } from '../Components/AuthProvider';

const AddressForm = () => {
  const { user } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactNo: '',
    total: 0,
  });
  
const [cartItems, setCartItems] = useState([]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

  const handlePinChange = async (e) => {
    //e.preventDefault();
    const { value } = e.target;
    const fullPincode = e.target.value;  // Capture full value here
   setFormData({ ...formData, pincode: fullPincode });
  // Update pincode in form data
    if (value.length === 6) { // Check if the length is 6 before making the API request
      try {
        const res = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
        const data = res.data;
        if (data && data.length > 0) {
          const city = data[0].PostOffice[0].Block;
          const state = data[0].PostOffice[0].State;
          setFormData({ ...formData, city, state }); // Update city and state in form data
        } else {
          // Handle invalid pincode response
        }
      } catch (err) {
        console.error('Error fetching pincode data:', err);
        // Handle error
      }
    }
  };


  const handleSubmit = async (e) => {
    //e.preventDefault();

    try {
      const totalPrice = localStorage.getItem('totalPrice') || 0;
      const storedCartItems = localStorage.getItem('cartItems');
      const parsedCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

      const cartItemsWithProductId = parsedCartItems.map((item) => ({
        Product_id: item.Product_id,
        orderId: generateOrderId(),
        Name: item.Name,
        Price: item.Price,
        quantity: item.quantity,
      }));

      const orderData = { ...formData, total: totalPrice, cartItems: cartItemsWithProductId };
      const res = await axios.post(`${apiUrl}/createorder`, orderData);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const generateOrderId = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <div className="flex items-center min-h-full mx-[4vw] text-gray-700">
      <div className="bg-white p-6 max-w-2xl w-full md:mt-[2rem] mx-auto">
        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
        <div className="md:flex md:mb-[2rem]">
          <div className="w-full md:w-1/2 md:mr-2 mb-4 md:mb-0">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 py-3 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-full md:w-1/2 md:ml-2">
            <label htmlFor="contactNo" className="text-sm font-medium text-gray-700">
              Contact number
            </label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="mt-1 p-2 block py-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-[2rem]">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 p-2 py-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="md:flex md:mb-4">
          <div className="w-full md:w-1/3 md:mr-2 mb-4 md:mb-[1rem]">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
    type="text"
    id="pincode"
    name="pincode"
    value={formData.pincode}
    onChange={handlePinChange}
    required
    className="mt-1 p-2 block py-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  />
          </div>
          <div className="w-full md:w-1/3 md:mr-2 mb-4 md:mb-0">
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="mt-1 p-2 block py-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
             onChange={handleChange}
              required
              className="mt-1 p-2 block py-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-[2rem] flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="radio"

              className="w-4 h-4 py-3 text-blue-600 bg-gray-100 rounded border-gray-300"
            />
            <label htmlFor="default-checkbox" className="ml-2 flex items-center text-lg font-medium text-fuchsia-900">
              <SiPhonepe className="text-2xl" />
              <span className="ml-1">Phone Pe</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-[#125872] text-white font-bold py-3 px-[50%] rounded w-full md:w-auto"
        >
          Pay
        </button>
      </div>
      <div className="w-[30%] p-[2rem]   border border-gray-300 sticky top-2 rounded-md">
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
              {`₹${localStorage.getItem("totalPrice") || 0}`}
            </p>
          </div>
          {/* <button className="bg-[#125872]  text-white font-semibold w-full py-3 rounded-md mt-4">
              Proceed To Pay
              </button> */}
        </div>
      </div>
    </div>
  );
};

export default AddressForm;