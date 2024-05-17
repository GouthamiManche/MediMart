import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

import { SiPhonepe } from 'react-icons/si';
import { AuthContext } from '../Components/AuthProvider';
import AddAddressModal from '../Components/AddAddressModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddressForm = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email || '';
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactNo: '',
    amount: 0,
    Image_URL: '',
    email,
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handlePinChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, pincode: value });
    setErrors((prevErrors) => ({ ...prevErrors, pincode: '' }));

    if (value.length === 6) {
      try {
        const res = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
        const data = res.data;

        if (data && data.length > 0 && data[0].PostOffice) {
          const city = data[0].PostOffice[0].Block;
          const state = data[0].PostOffice[0].State;

          setFormData((prevFormData) => ({
            ...prevFormData,
            city,
            state,
            pincode: data[0].PostOffice[0].Pincode,
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, pincode: 'Invalid pincode' }));
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
      const cartItemsResponse = await axios.get(`${apiUrl}/getcartitems?email=${email}`);
      const cartItems = cartItemsResponse.data;
  
      const cartItemsWithProductId = cartItems.map((item) => ({
        Product_id: item.Product_id,
        Name: item.Name,
        Price: item.Price,
        quantity: item.quantity,
        Image_URL: item.Image_URL,
      }));
  
      const orderData = {
        ...formData,
        amount: totalPrice, // Convert total amount to paise
        cartItems: cartItemsWithProductId,
        Image_URL: cartItems.length > 0 ? cartItems[0].Image_URL : '',
      };
  
      const res = await axios.post(`${apiUrl}/createorder`, orderData);
      console.log("Order creation response:", res.data);
      
      if (res.data.orderDetails) {
        const { orderId, amount, key, email, fullName, orderDate, Image_URL } = res.data.orderDetails;
        const options = {
          key,
          amount,
          currency: 'INR',
          name:"MediMart",
          description: 'Order Payment',
          order_id: orderId,
          handler: async function (response) {
            const body = {
              ...response,
            };
    
            const validateRes = await fetch(
              "http://localhost:4000/order/validate",
              {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const jsonRes = await validateRes.json();
            console.log(jsonRes);
            toast.success(`Payment successfull`);
            navigate('/orderplaced');
          },
          prefill: {
            name: fullName,
            email: email,
            contact: formData.contactNo,
          },
          notes: {
            address: formData.address,
          },
          theme: {
            color: '#3399cc',
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
        e.preventDefault();
      }
    } catch (err) {
      console.error("Error in order creation or payment initiation:", err);
      alert("Error in order creation or payment initiation. Please try again.");
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


  const handleAddAddress = (data) => {
    // Handle adding a new address
    console.log('New address:', data);
  };

  return (
    <div className="flex items-center min-h-full mx-[4vw] text-gray-700">
      <div className="bg-white p-6 max-w-2xl w-full md:mt-[2rem] mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#125872]">Shipping Address</h2>
        <form onSubmit={handleSubmit}>
          {/* Address Inputs */}
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
                } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
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
                } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              />
              {errors.contactNo && <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>}
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
              } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
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
                } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>
            <div className="w-full md:w-1/3 md:mr-2 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className={`mt-1 p-2 block py-3 w-full border ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className={`mt-1 p-2 block py-3 w-full border ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
          </div>
          <div className="mb-[2rem] flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="radio"
                className="w-4 h-4 py-3 text-[#125872] bg-gray-100 rounded border-gray-300"
              />
              <label htmlFor="default-checkbox" className="ml-2 flex items-center text-lg font-medium text-[#125872]">
                <SiPhonepe className="text-2xl" />
                <span className="ml-1">Phone Pe</span>
              </label>
            </div>
          </div>
          <button type="submit" className="bg-[#125872] text-white font-bold py-3 px-[50%] rounded w-full md:w-auto">
            Pay
          </button>
        </form>
      </div>
      <div className="w-[30%] p-[2rem] border border-gray-300 sticky top-2 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Order Total</h2>
        <div className="bg-white">
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
