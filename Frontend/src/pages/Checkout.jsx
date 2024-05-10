import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SiPhonepe } from 'react-icons/si';
import { AuthContext } from '../Components/AuthProvider';

const AddressForm = () => {
  const { user } = useContext(AuthContext);
  const email = user && user.email ? user.email : '';
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
    email: email , // Check if user.email exists
  });

  const [cartItems, setCartItems] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handlePinChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, pincode: value });
    setErrors({ ...errors, pincode: '' });

    if (value.length === 6) {
      try {
        const res = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
        const data = res.data;

        if (data && data.length > 0) {
          const city = data[0].PostOffice[0].Block;
          const state = data[0].PostOffice[0].State;

          setFormData((prevFormData) => ({
            ...prevFormData,
            city,
            state,
            pincode: data[0].PostOffice[0].Pincode,
          }));
        } else {
          setErrors({ ...errors, pincode: 'Invalid pincode' });
        }
      } catch (err) {
        console.error('Error fetching pincode data:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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

      const orderData = {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        contactNo: formData.contactNo,
        total: totalPrice,
        cartItems: cartItemsWithProductId,
        email: formData.email,
      };
      console.log(formData.email);
      const res = await axios.post(`${apiUrl}/createorder`, orderData);
      console.log(res.data);
    }catch (err) {
      console.error(err);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!formData.contactNo.trim()) {
      errors.contactNo = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contactNo)) {
      errors.contactNo = 'Contact number must be 10 digits';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!formData.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = 'Pincode must be 6 digits';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      errors.state = 'State is required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
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
        <form onSubmit={handleSubmit}>
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
                className={`mt-1 py-3 p-2 block w-full border ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 md:ml-2">
              <label htmlFor="contactNo" className="text-sm font-medium text-gray-700">
                Contact number
              </label>
              <input
                type="number"
                id="contactNo"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
                className={`mt-1 p-2 block py-3 w-full border ${
                  errors.contactNo ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.contactNo && (
                <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>
              )}
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
              className={`mt-1 p-2 py-3 block w-full border ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          <div className="md:flex md:mb-4">
            <div className="w-full md:w-1/3 md:mr-2 mb-4 md:mb-[1rem]">
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="number"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handlePinChange}
                required
                className={`mt-1 p-2 block py-3 w-full border ${
                  errors.pincode ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
              )}
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
                className={`mt-1 p-2 block py-3 w-full border ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
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
                className={`mt-1 p-2 block py-3 w-full border ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
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
            className="bg-[#125872] text-white font-bold py-3 px-[50%] rounded w-full md:w-auto"
          >
            Pay
          </button>
        </form>
      </div>
      <div className="w-[30%] p-[2rem] border border-gray-300 sticky top-2 rounded-md">
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
              {`₹${localStorage.getItem('totalPrice') || 0}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
