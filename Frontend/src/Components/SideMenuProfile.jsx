import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const SideMenu = () => {
  const menuItems = [
    { name: 'Profile', icon: '📊', path: '/profile' },
    { name: 'Order History', icon: '📁', path: '/orderhistory' },
    { name: 'Address', icon: '🔔', path: '/useraddress' },
   
  ];

  return (
    <div className="w-full md:w-[15rem] bg-[#125872] text-white">
      <div className="mb-8 mt-5 md:mt-[5rem] ml-4">
        {/* <h2 className="text-2xl font-semibold font-poppins">CodingLab</h2> */}
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2  ${
                    isActive ? 'bg-white text-black' : ''
                  }`
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideMenu;