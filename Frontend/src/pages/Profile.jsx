import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../Components/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

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
        <>
            <div className="flex flex-col md:flex-row font-poppins">
                <div className="w-full md:w-[15rem] bg-[#125872] ">
                    <div>
                        <h2 className="text-2xl font-semibold text-white font-poppins mt-5 md:mt-[5rem] ml-4">Profile</h2>
                        <div className='md:mt-[2rem] '> <Link to="/orderhistory" className="text-xl text-white font-poppins mt-1 ml-4">Order history</Link></div>
                    </div>
                </div>
                <div className="w-full md:w-[100%] md:h-full ">
                    <div className="flex flex-col md:flex-row  shadow-2xl  rounded p-4 md:m-4 md:m-12">

                        <div className="md:hidden flex justify-center mt-8">
                            <div className="relative mb-4">
                                <img
                                    className="object-cover w-[7rem] h-[7rem] rounded-full"
                                    src={profilePic}
                                    alt="Profile"
                                />
                                <div className="absolute inset-0 flex items-center justify-center w-[7rem] mt-[9rem]">
                                    <label htmlFor="photo-upload" className="bg-[#90CCBA] text-xs text-white px-2 py-2 rounded cursor-pointer">
                                        Change photo
                                    </label>
                                    <input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                </div>
                            </div>
                        </div>

                        <div className='w-full md:w-[30rem]'>
                            <div className="mb-4 relative">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={fullName}
                                    className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#90CCBA]"
                                    placeholder="Enter Your Name"
                                    required
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input
                                    type="tel"
                                    id="number"
                                    name="number"
                                    value={contactNumber}
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength="10"
                                    className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#90CCBA]"
                                    placeholder="Enter Your Number"
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)} // Handle the change event for the dropdown
                                    className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#90CCBA]"
                                    required
                                >
                                    <option value="">Select your gender</option>
                                    <option value="Female">Female</option> {/* Updated values to match the backend */}
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date Of Birth</label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={dob}
                                    className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#90CCBA]"
                                    onChange={(e) => setDOB(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={user ? user.email : ''}
                                    className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#90CCBA]"
                                    required
                                />
                            </div>

                        
                            <button onClick={handleSaveProfile} type="submit" className="bg-[#125872] text-white px-4 py-2 rounded">Save changes</button>
                        </div>

                        {/* Desktop view */}
                        <div className="hidden md:block md:w-[17rem] ml-[10rem]">
                            <div className="relative">
                                <img
                                    className="object-cover w-[17rem] h-[17rem] rounded-full"
                                    src={profilePic}
                                    alt="Profile"
                                />
                                <div className="absolute inset-0 flex items-center justify-center mt-[19.5rem]">
                                    <label htmlFor="photo-upload" className="bg-[#125872] text-white px-4 py-2 rounded cursor-pointer">
                                        Change photo
                                    </label>
                                    <input id="photo-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
