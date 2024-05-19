import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaUserAlt, FaCreditCard, FaTag, FaMoneyBillAlt } from 'react-icons/fa';
import { Link, useParams } from "react-router-dom";

const OrderPlaced = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Fetch order details from the API using the orderId parameter
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/getorderdetails/${orderId}`);
        if (res.data.order) {
          setOrderDetails(res.data.order);
        } else {
          console.error('Invalid order data');
        }
      } catch (err) {
        console.error('Error fetching order details:', err);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="flex flex-col items-center max-h-screen">
      <div className="bg-white p-6 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-[1rem] text-center">Thank you for your purchase!</h1>

        {orderDetails && (
          <div className="mb-4 space-y-[1.2rem]">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <FaCalendarAlt className="text-blue-500 mr-2" />
                <span>Date:</span>
              </div>
              <p className="text-gray-600">{orderDetails.orderDate}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <FaUserAlt className="text-blue-500 mr-2" />
                <span>Customer:</span>
              </div>
              <p className="text-gray-600">{orderDetails.fullName}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <FaCreditCard className="text-blue-500 mr-2" />
                <span>Payment Method:</span>
              </div>
              <p className="text-gray-600">
                <span className="text-blue-800">{orderDetails.paymentStatus}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <FaTag className="text-blue-500 mr-2" />
                <span>Order Number:</span>
              </div>
              <p className="text-gray-600">{orderDetails._id}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaMoneyBillAlt className="text-blue-500 mr-2" />
                <span>Total:</span>
              </div>
              <p className="text-gray-600">${orderDetails.amount}</p>
            </div>
          </div>
        )}

        <div className="mb-[2rem]">
          <h2 className="text-lg font-bold mb-[1rem]">Order Line</h2>
          {orderDetails && orderDetails.cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <span className="text-2xl mb-[2rem]">🛍️</span>
              <div className="text-center">
                <p className="font-bold">{item.Name}</p>
                <p className="text-gray-600">${item.Price}</p>
              </div>
            </div>
          ))}
        </div>

        <Link to="/">
          <div className="md:w-[40%]">
            <button className="bg-[#125872] text-white font-bold py-2 px-4 rounded w-full">
              Continue shopping
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OrderPlaced;
