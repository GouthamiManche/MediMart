import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAddressModal = ({ isOpen, onClose, onAddAddress }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactNo: '',
    addressType: 'Home', // Default to Home
    otherAddressName: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset errors when modal is opened or closed
    setErrors({});

    // Cleanup function to reset form data when modal is closed
    return () => {
      setFormData({
        fullName: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        contactNo: '',
      });
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear error message when input changes
    }));
  };

  const handlePincodeChange = async (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      pincode: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      pincode: '', // Clear pincode error message when input changes
    }));

    if (value.length === 6) {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
        const data = response.data;

        if (data && data.length > 0 && data[0]?.Status === 'Success') {
          const city = data[0]?.PostOffice[0]?.Block;
          const state = data[0]?.PostOffice[0]?.State;

          setFormData((prevData) => ({
            ...prevData,
            city,
            state,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            pincode: 'Invalid pincode',
          }));
        }
      } catch (error) {
        console.error('Error fetching pincode data:', error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          pincode: 'Error fetching pincode data',
        }));
      }
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!data.contactNo.trim()) {
      errors.contactNo = 'Contact number is required';
    } else if (!/^\d{10}$/.test(data.contactNo)) {
      errors.contactNo = 'Contact number must be 10 digits';
    }
    if (!data.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!data.city.trim()) {
      errors.city = 'City is required';
    }
    if (!data.state.trim()) {
      errors.state = 'State is required';
    }
    if (!data.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(data.pincode)) {
      errors.pincode = 'Pincode must be 6 digits';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      onAddAddress(formData);
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-md w-full  mx-2 md:mx-auto z-10">
        <h2 className="text-2xl font-bold mb-4">Add Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[0.5rem]">
            <div>
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`mt-1 py-2 p-2 block w-full border ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
                required
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="contactNo" className="text-sm font-medium text-gray-700">
                Contact number
              </label>
              <input
                type="text"
                id="contactNo"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                className={`mt-1 p-2 block py-2 w-full border ${errors.contactNo ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
                required
              />
              {errors.contactNo && <p className="text-red-500 text-sm mt-1">{errors.contactNo}</p>}
            </div>
          </div>
          <div className="mb-[0.5rem]">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`mt-1 p-2 block py-2 w-full border ${errors.address ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              required
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[0.5rem]">
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handlePincodeChange}
                className={`mt-1 p-2 block py-2 w-full border ${errors.pincode ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
                required
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`mt-1 p-2 block py-2 w-full border ${errors.city ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
                required
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
          </div>
          <div className="mb-[0.5rem]">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`mt-1 p-2 block py-2 w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              required
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
          <div className="mb-[0.5rem]">
            <label htmlFor="addressType" className="block text-sm font-medium text-gray-700">
              Address Type
            </label>
            <select
              id="addressType"
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
              className={` p-2 py-3 block w-full border ${errors.addressType ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm`}
              required
            >
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
            {formData.addressType === 'Other' && (
              <input
                type="text"
                id="otherAddressName"
                name="otherAddressName"
                value={formData.otherAddressName}
                onChange={handleChange}
                placeholder="Enter Other Address Name"
                className=" p-2 py-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-[#125872] focus:border-[#125872] sm:text-sm"
                required
              />
            )}
            {errors.addressType && <p className="text-red-500 text-sm mt-1">{errors.addressType}</p>}
          </div>
          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="bg-[#125872] text-white px-4 py-2 rounded-md">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
