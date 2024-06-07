import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../Components/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserNavigation from '../Components/UserNavigation';

function Profile() {
    const { user, logout } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [profilePic, setProfilePic] = useState('src/assets/img/profile.png');
    const [fullName, setFullName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDOB] = useState('');
    const [addresses, setAddresses] = useState([]);

    const apiUrl = import.meta.env.VITE_API_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        if (user) {
            fetchProfile(user.email);
        }
    }, [user]);

    const fetchProfile = async (email) => {
        try {
            const response = await axios.get(`${apiUrl}/profile/${email}`);
            const { fullName, contactNumber, deliveryAddress, profilePic, gender, dateOfBirth, addresses } = response.data;
            setProfile(response.data);
            setFullName(fullName);
            setContactNumber(contactNumber);
            setDeliveryAddress(deliveryAddress);
            setProfilePic(profilePic || 'src/assets/img/profile.png');
            setGender(gender);
            setDOB(dateOfBirth);
            setAddresses(addresses);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveProfile = async () => {
        try {
            const response = await axios.post(`${apiUrl}/profile`, {
                email: user.email,
                fullName: fullName,
                contactNumber: contactNumber,
                deliveryAddress: deliveryAddress,
                profilePic: profilePic,
                gender: gender,
                dateOfBirth: dob,
            });
            console.log(response.data);
            toast.success("Profile updated");
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfilePic(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center">
            <UserNavigation />
            <div className="container mx-auto p-6 mt-6">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 flex flex-col items-center">
                        <img
                            className="object-cover w-[17rem] h-[17rem] rounded-full"
                            src={profilePic}
                            alt="Profile"
                        />
                        <label htmlFor="photo-upload" className="bg-[#125872] text-white mt-4 px-4 py-2 rounded cursor-pointer">
                            Change photo
                        </label>
                        <input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </div>
                    <div className="md:w-2/3 md:pl-8">
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={fullName}
                                className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#125872]"
                                placeholder="Enter Your Name"
                                required
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="number" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                            <input
                                type="tel"
                                id="number"
                                name="number"
                                value={contactNumber}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength="10"
                                className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#125872]"
                                placeholder="Enter Your Number"
                                onChange={(e) => setContactNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#125872]"
                                required
                            >
                                <option value="">Select your gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date Of Birth</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={dob}
                                className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#125872]"
                                onChange={(e) => setDOB(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user ? user.email : ''}
                                className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#125872]"
                                readOnly
                            />
                        </div>
                        <button onClick={handleSaveProfile} className="bg-[#125872] text-white px-6 py-2 rounded">
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
