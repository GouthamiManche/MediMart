import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { SiRazorpay } from "react-icons/si";
import { AuthContext } from '../Components/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddressForm = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email || '';
  const apiUrl = import.meta.env.VITE_API_URL;
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
        amount: totalPrice,
        cartItems: cartItemsWithProductId,
        Image_URL: cartItems.length > 0 ? cartItems[0].Image_URL : '',
      };

      const res = await axios.post(`${apiUrl}/createorder`, orderData);

      if (res.data.orderDetails) {
        const { orderId, amount, key, email, fullName, orderDate } = res.data.orderDetails;
        const options = {
          key,
          amount,
          currency: 'INR',
          name: "MediMart",
          description: 'Order Payment',
          order_id: orderId,
          handler: async function (response) {
            const body = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const validateRes = await axios.post(`${apiUrl}/order/validate`, body);

            if (validateRes.data.msg === 'success') {
              toast.success(`Payment successful`);
              deleteAllCartItems(email);
              navigate(`/orderplaced/${orderId}`);
            } else {
              toast.error('Payment validation failed');
              navigate('/checkout');
            }
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
      }
    } catch (err) {
      console.error("Error in order creation or payment initiation:", err);
      alert("Error in order creation or payment initiation. Please try again.");
    }
  };

  const deleteAllCartItems = async (email) => {
    try {
      await axios.delete(`${apiUrl}/deleteallcartitems`, { data: { email } });
      console.log('All cart items deleted successfully');
    } catch (error) {
      console.error('Error deleting cart items:', error);
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

  return (
    <div className="flex items-center min-h-full mx-[4vw] text-gray-700">
      <div className="bg-white p-6 max-w-2xl w-full md:mt-[2rem] mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#125872]">Shipping Address</h2>
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
            <div className="w-full md:w-1/3 md:mr-2 mb-4 md:mb-0">
              <label htmlFor="pincode" className="text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handlePinChange}
                required
                className={`mt-1 p-2 py-3 block w-full border ${
                  errors.pincode ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>
            <div className="w-full md:w-1/3 md:mr-2 mb-4 md:mb-0">
              <label htmlFor="city" className="text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                readOnly
                className={`mt-1 p-2 py-3 block w-full border ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div className="w-full md:w-1/3 md:ml-2">
              <label htmlFor="state" className="text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                readOnly
                className={`mt-1 p-2 py-3 block w-full border ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-[2rem] px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#125872] hover:bg-[#0066ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#125872] sm:w-auto sm:text-sm"
            >
              <div className="flex items-center">
                <SiRazorpay className="w-6 h-6 mr-2" />
                Pay Now
              </div>
            </button>
          </div>
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
