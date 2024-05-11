import React, { useState } from 'react';

const AddAddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    state: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-800 bg-opacity-50 absolute inset-0" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
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
              className="border border-gray-300 rounded-md w-full p-2"
              placeholder="e.g. Home, Office"
            />
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
              className="border border-gray-300 rounded-md w-full p-2"
              placeholder="e.g. 123 Main Street, Anytown, USA"
            />
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
                className="border border-gray-300 rounded-md w-full p-2"
                placeholder="e.g. New York"
              />
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
                className="border border-gray-300 rounded-md w-full p-2"
                placeholder="e.g. NY"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddressModal;
