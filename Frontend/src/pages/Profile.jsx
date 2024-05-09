import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from '../Components/AuthProvider';

function ProfileSection() {
    const { user, logout } = useContext(AuthContext);
    const handleChange = (event) => {
        const { value } = event.target;
        const filteredValue = value.replace(/\D/g, '');
        event.target.value = filteredValue;
    };

    return (
        <>
       
            <div className="flex h-[36.5rem] font-poppins">
                <div className="w-[15rem] bg-[#125872] ">
                    <h2 className="text-2xl font-semibold text-white font-poppins mt-[5rem] ml-4">Profile</h2>
                    <p className='text-xl text-white font-poppins mt-[1rem] ml-4'>Order history</p>
                    <Link to="/" className="mb-12">
                        <button
                            onClick={logout}
                            className="text-xl text-white font-poppins mt-[1rem] ml-4"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-3"
                        >
                            Logout
                        </button>
                    </Link>
                </div>

                <div className="w-[66rem] ">
                    <div className="flex border border-gray-500 h-[24rem] w-[63rem] rounded p-4 ml-4 mt-12">
                        <div className='w-[30rem] mt-[1rem]'>
                            <div className="mb-4 relative">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#90CCBA]"
                                    placeholder="Aishwarya"
                                    required
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">&#9998;</span>
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Contact number</label>
                                <input
                                    type="tel"
                                    id="number"
                                    name="number"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength="10"
                                    className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#90CCBA]"
                                    placeholder="8548612325"
                                    onChange={handleChange}
                                    required
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">&#9998;</span>
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#90CCBA]"
                                    placeholder="aishwarya@gmail.com"
                                    required
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">&#9998;</span>
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="street" className="block text-sm font-medium text-gray-700">Delivery address</label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    className="mt-1 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#90CCBA]"
                                    placeholder="Hiranandani, Powai"
                                    required
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">&#9998;</span>
                            </div>

                            <button type="submit" className="bg-[#125872] text-white px-4 py-2 rounded">Save changes</button>
                        </div>

                        <div className="ml-[8rem] mt-[2rem]">
                            <div className="relative">
                            {/* <CgProfile className='text-[20rem]'/> */}
                                <img
                                    className="object-cover w-[17rem] h-[17rem]"
                                    src="src/assets/Profilee.png"
                                    alt="Profile"
                                />
                                {/* <div className="absolute inset-0 flex items-center justify-center mt-[19.5rem]">
                                    <button className="bg-[#125872] font-semibold text-white px-4 py-2 rounded-full">Change photo</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileSection