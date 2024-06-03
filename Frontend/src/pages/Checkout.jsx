import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SiRazorpay } from "react-icons/si";
import { AuthContext } from '../Components/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAddressModal from '../Components/AddAddressModal';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
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
  const [addresses, setAddresses] = useState([]); // Add state for addresses
  const [showModal, setShowModal] = useState(false); // Add state for modal visibility
  const [selectedAddress, setSelectedAddress] = useState(null); // Add state for selected address
  const [cartItems, setCartItems] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const calculateDiscount = () => {
    return (getCartTotal() * discountPercentage) / 100;
  };

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
      console.log(res.data.orderDetails);
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
            "hide_topbar": true
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (err) {
      console.error("Error in order creation or payment initiation:", err);
      toast.error("Go back and Please try again.");
      navigate('/checkout');
    }
  };

  const deleteAllCartItems = async (email) => {
    try {
      await axios.delete(`${apiUrl}/deleteallcartitems`, { data: { email } });
      //console.log('All cart items deleted successfully');
    } catch (error) {
      console.error('Error deleting cart items:', error);
    }
  };
  const getCartTotal = () => {
    localStorage.getItem('totalPrice')
  }

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

  useEffect(() => {
    // Fetch addresses from server
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/addresses`, { params: { email } });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        toast.error('Failed to fetch addresses');
      }
    };

    if (email) {
      fetchAddresses();
    }
  }, [email, apiUrl]);

  const handleAddAddress = async (newAddress) => {
    try {
      const response = await axios.post(`${apiUrl}/user/add-address`, { email, address: newAddress });
      setAddresses(response.data);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setFormData({
      ...formData,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      fullName: address.fullName,
      contactNo: address.contactNo
    });
  };

  return (
    <div className='flex items-center justify-center'>
      <div className="flex flex-col items-center min-h-full w-[70%] mx-[4vw] text-gray-700">
        <div className="bg-white p-6 max-w-2xl w-full md:mt-[2rem] mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-[#125872]">Shipping Address</h2>
          <div>
            <h3 className="text-lg font-semibold mb-2">Saved Addresses</h3>
            {addresses.length === 0 ? (
              <p>No addresses saved yet.</p>
            ) : (
              addresses.map((address, index) => (
                <div key={index} className="border border-gray-300 rounded-md p-4 mb-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">{address.fullName}</h4>
                    <input
                      type="checkbox"
                      checked={selectedAddress === address}
                      onChange={() => handleSelectAddress(address)}
                    />
                  </div>
                  <p>{address.contactNo}</p>
                  <p>{address.address}</p>
                  <p>{address.city}, {address.state} {address.pincode}</p>
                  <div className="border-t border-[2px] border-dotted my-2"></div>
                  <div className="flex justify-between items-center ">
                    <button className="text-gray-500 hover:text-red-700">
                      <FaTrashAlt />
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-blue-700">
                      <FaEdit /> <span className='ml-[4px]'>Edit</span>
                    </button>
                  </div>

                </div>

              ))
            )}
            <button
              className="bg-[#125872] text-white px-4 py-2 rounded-md mt-2"
              onClick={() => setShowModal(true)}
            >
              Add address
            </button>
          </div>
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
                  className={`mt-1 py-3 p-2 block w-full border ${errors.fullName ? 'border-red-500' : 'border-gray-300'
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
                  className={`mt-1 p-2 block py-3 w-full border ${errors.contactNo ? 'border-red-500' : 'border-gray-300'
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
                className={`mt-1 p-2 py-3 block w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            <div className="md:flex md:mb-[2rem]">
              <div className="w-full md:w-1/2 md:mr-2 mb-4 md:mb-0">
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
                  className={`mt-1 p-2 py-3 block w-full border ${errors.pincode ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
                />
                {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
              </div>
              <div className="w-full md:w-1/2 md:ml-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className={`mt-1 p-2 py-3 block w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className={`mt-1 p-2 py-3 block w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>

            {/* <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#125872] hover:bg-[#0E4E63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E4E63]"
            >
              RazorPay <SiRazorpay className="ml-2" />
            </button>
          </div> */}

          </form>
        </div>
        <AddAddressModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAddAddress={handleAddAddress}
        />
      </div>
      <div className="w-[30%] p-[2rem] h-full border border-gray-300  rounded-md md:block hidden shadow-md text-gray-700 mr-[4rem]">
        <h2 className="text-2xl font-bold mb-4">Order Total</h2>
        <div className="bg-white">



          <div className="border-t border-gray-300 pt-4 flex justify-between">
            <p className="font-bold">Total</p>
            <p className="font-bold">{`₹${localStorage.getItem('totalPrice')}`}</p>
          </div>
          <div className="mt-4">

          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex items-center justify-center px-24 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#125872] hover:bg-[#0E4E63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0E4E63]"
            >
              RazorPay <SiRazorpay className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden text-gray-700">
        {cartItems.length > 0 && (
          <div className="bg-white rounded-md p-4">
            <h2 className="text-2xl font-bold mb-4">Order Total</h2>


            {/* Calculate and Display Total */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">Total</p>
              <p className="font-semibold">{`₹${localStorage.getItem('totalPrice')}`}</p>
            </div>
            {/* Apply Coupon Button */}

            {/* Checkout Button */}
            <button onClick={handleSubmit} className="bg-[#125872] text-white font-semibold w-full py-3 rounded-md mt-4">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressForm;