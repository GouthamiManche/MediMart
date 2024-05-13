import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Components/AuthProvider';
import moment from 'moment';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

function OrderHistory() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (user) {
      fetchOrderHistory(user.email);
    }
  }, [user]);

  const fetchOrderHistory = async (email) => {
    try {
      const response = await fetch(
        `${apiUrl}/orders/${email}`
      );
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  const handleManageOrder = (orderId) => {
    // Implement your logic for managing order here
  };

  const handleViewInvoice = (orderId) => {
    // Implement your logic for viewing invoice here
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  const handleBuyAgain = (productId) => {
    // Implement your logic for buying again here
  };

  const handleViewProduct = (productId) => {
    // Implement your logic for viewing product details here
  };

  return (
    <div className="container mx-auto px-4 py-8 md:w-3/4 lg:w-[80%]">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Purchase History</h2>
      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-md overflow-hidden border border-gray-200">
            <div
              className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center cursor-pointer"
              onClick={() => toggleOrderExpansion(order.orderId)}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Order #{order.orderId}</h3>
                <span className="text-sm text-gray-600">
                  Delivery Date: {moment(order.orderDate).format('MMMM D, YYYY')}
                </span>
              </div>
              <div className="text-lg">
                {expandedOrderId === order.orderId ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </div>
            </div>
            {expandedOrderId === order.orderId && (
              <div className="p-4 md:p-6">
                {/* Detailed order information here */}
                {order.cartItems.map((item) => (
                  <div key={item._id} className="flex items-center mb-4">
                    {item.Image_URL && (
                      <img
                        src={item.Image_URL}
                        alt={item.Name}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover mr-4 md:mr-6 rounded-md"
                      />
                    )}
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-gray-800">{item.Name}</h4>
                      <p className="text-xs md:text-sm text-gray-600">
                     Quantity :  {item.quantity} {item.Size}
                      </p>
                      <p className="text-base md:text-lg font-semibold text-gray-800">₹{item.Price}</p>
                      <div className="flex mt-2">
                        <button
                          onClick={() => handleBuyAgain(item._id)}
                          className="bg-[#125872] text-white px-2 py-2 rounded-md mr-2 hover:bg-[#0d4255] text-xs md:text-sm"
                        >
                          Buy Again
                        </button>
                        <button
                          onClick={() => handleViewProduct(item._id)}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 text-xs md:text-sm"
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <div className="text-xs md:text-sm text-gray-700">Payment Status: {order.paymentStatus}</div>
                  <div className="text-base md:text-lg font-semibold text-gray-800">Total: ₹{order.total}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
