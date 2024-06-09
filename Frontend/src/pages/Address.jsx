import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Components/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAddressModal from '../Components/AddAddressModal';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import UserNavigation from '../Components/UserNavigation';
import LoadingGif from '../Components/LoadingGif';
import ManageAddModal from '../Components/ManageAddModal';

const Address = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email || '';
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/user/addresses`, { params: { email } });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        toast.error('Failed to fetch addresses');
      } finally {
        setIsLoading(false);
      }
    };

    if (email) {
      fetchAddresses();
    }
  }, [email, apiUrl]);

  const handleAddAddress = async (newAddress, addressType) => { // Updated to pass addressType
    try {
      const response = await axios.post(`${apiUrl}/user/add-address`, { email, address: newAddress, addressType }); // Passed addressType
      setAddresses(response.data);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(`${apiUrl}/user/address/${addressId}`, {
        data: { email }
      });
      console.log('Address deleted:', response.data);
      setAddresses(addresses.filter(address => address.addressId !== addressId));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleEditClick = (address) => {
    setAddressToEdit(address);
    setShowManageModal(true);
  };

  const handleEditAddress = async (formData) => {
    if (!addressToEdit || !addressToEdit.addressId) {
      console.error('Invalid address data');
      return;
    }
    try {
      const response = await axios.put(`${apiUrl}/user/address/${addressToEdit.addressId}`, {
        email,
        address: formData,
      });
      setShowManageModal(false);
      const updatedAddresses = await axios.get(`${apiUrl}/user/addresses`, { params: { email } });
      setAddresses(updatedAddresses.data);
    } catch (error) {
      console.error('Error editing address:', error);
    }
  };

  return (
    <div className="flex justify-center">

      <div className="h-full flex flex-col min-h-full w-full mx-[4vw] text-gray-700">
        <div className='mb-6 bg-white flex flex-col items-center'>
          <UserNavigation />
        </div>
        <div className="bg-white p-6 max-w-6xl w-full mx-auto">
          {isLoading ? (
            <LoadingGif />
          ) : (
            <div>
              {addresses.length === 0 ? (
                <p>No addresses saved yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {addresses.map((address, index) => (
                    <div key={index} className="border border-gray-300 rounded-md p-4">
                      <h4 className="text-lg font-semibold">{address.fullName}</h4>
                      <p>{address.contactNo}</p>
                      <p>{address.address}</p>
                      <p>{address.city}, {address.state} {address.pincode}</p>
                      <p>Address Type: {address.addressType}</p>
                      <div className="flex justify-between items-center">
                        <button onClick={() => handleDeleteAddress(address.addressId)} className="text-gray-500 hover:text-red-700">
                          <FaTrashAlt />
                        </button>
                        <button onClick={() => handleEditClick(address)} className="flex items-center text-gray-500 hover:text-blue-700">
                          <FaEdit /><span className="ml-[4px]">Edit</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="bg-[#125872] text-white px-4 py-2 rounded-md mt-2"
                onClick={() => setShowAddModal(true)}
              >
                Add address
              </button>
            </div>
          )}
        </div>
        <AddAddressModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddAddress={handleAddAddress}
        />
        <ManageAddModal
          isOpen={showManageModal}
          onAddAddress={handleEditAddress}
          onClose={() => setShowManageModal(false)}
          addressToEdit={addressToEdit}
        />
      </div>
    </div>
  );
};

export default Address;
