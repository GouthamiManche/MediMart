import React from 'react';
import { FaCalendarAlt, FaUserAlt, FaCreditCard, FaTag, FaMoneyBillAlt } from 'react-icons/fa';

const orderLineItems = [
  {
    name: 'Product 1',
    price: 104,
    icon: '🛍️',
  },
  {
    name: 'Product 2',
    price: 76,
    icon: '🧺',
  },
];

export default function OrderPlaced() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white p-6  max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Thank you for your purchase!</h1>

        <div className=" mb-4 space-y-2 ">
          <div className="flex items-center justify-between">
            <div className='flex items-center text-gray-600'>
            <FaCalendarAlt className="text-blue-500 mr-2" />
           <span className=''>Date:</span> 
           </div>
            <p className="text-gray-600"> 27/04/2022</p>
          </div>
          <div className="flex items-center  justify-between">
          <div className='flex items-center text-gray-600'>
            <FaUserAlt className="text-blue-500 mr-2" />
            <span className=''>Customer:</span>
            </div>
            <p className="text-gray-600"> Alvaro Garcia</p>
           
          </div>
          <div className="flex items-center justify-between ">
          <div className='flex items-center text-gray-600 '>
            <FaCreditCard className="text-blue-500 mr-2" />
            <span className=''>Payment Method:</span>
            </div>
            <p className="text-gray-600"> <span className="text-pink-800">Phone Pe</span></p>
          
          </div>
          <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <FaTag className="text-blue-500 mr-2" />
            <span>Order Number:</span>
            </div>
            <p className="text-gray-600"> 732123457</p>
          </div>
          <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <FaMoneyBillAlt className="text-blue-500 mr-2" />
            <span>Total: </span>
            </div>
            <p className="text-gray-600">$187</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2 text-center">Order Line</h2>
          {orderLineItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <span className="text-2xl">{item.icon}</span>
              <div className="text-center">
                <p className="font-bold">{item.name}</p>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="bg-[#125872] text-white font-bold py-2 px-4 rounded w-full">
          Continue shopping
        </button>
      </div>
    </div>
  );
}