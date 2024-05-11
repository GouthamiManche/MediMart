import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      // No validation errors, submit the form
      onSubmit(formData);
      onClose();
    } else {
      // Update errors state to display error messages
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Validate each field
    if (!data.title.trim()) {
      errors.title = 'Title is required';
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

    // Fetch city and state based on pincode
    if (value.length === 6) {
      try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${value}`);
        const data = response.data;

        if (data && data.length > 0 && data[0]?.Status === 'Success') {
          const city = data[0]?.PostOffice[0]?.District;
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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10">
        <h2 className="text-2xl font-bold mb-4">Add Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">
              Address title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`border border-gray-300 rounded-md w-full p-2 ${
                errors.title ? 'border-red-500' : ''
              }`}
              placeholder="e.g. Home, Office"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-semibold mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`border border-gray-300 rounded-md w-full p-2 ${
                errors.address ? 'border-red-500' : ''
              }`}
              placeholder="e.g. 123 Main Street, Anytown, USA"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-gray-700 font-semibold mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`border border-gray-300 rounded-md w-full p-2 ${
                  errors.city ? 'border-red-500' : ''
                }`}
                placeholder="e.g. New York"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="state" className="block text-gray-700 font-semibold mb-1">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`border border-gray-300 rounded-md w-full p-2 ${
                  errors.state ? 'border-red-500' : ''
                }`}
                placeholder="e.g. NY"
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="pincode" className="block text-gray-700 font-semibold mb-1">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handlePincodeChange}
              className={`border border-gray-300 rounded-md w-full p-2 ${
                errors.pincode ? 'border-red-500' : ''
              }`}
              placeholder="e.g. 123456"
            />
            {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
          </div>
          <div className="flex justify-end mt-4">
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
