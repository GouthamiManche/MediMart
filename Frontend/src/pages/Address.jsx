import React, { useState } from 'react';
import axios from 'axios';

const AddressForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    apartment: '',
    locality: '',
    city: '',
    state: '',
    pincode: '',
    contactNo: '',
    saveAs: 'home', // Default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/address`, formData);
      console.log(res.data); // Log the response data
    } catch (err) {
      console.error(err); // Log any errors
    }
  };

  return (
    <form  onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-pink-100 rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name:
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City:
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
          State:
        </label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
          Pincode:
        </label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
          Contact No:
        </label>
        <input
          type="text"
          id="contactNo"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="saveAs" className="block text-sm font-medium text-gray-700">
          Save As:
        </label>
        <select
          id="saveAs"
          name="saveAs"
          value={formData.saveAs}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="home">Home</option>
          <option value="office">Office</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        Submit
      </button>
    </form>
  );
};

export default AddressForm;
