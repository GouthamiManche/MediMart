import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Components/AuthProvider';

function OrderHistory() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchOrderHistory(user.email);
    }
  }, [user]);

  const fetchOrderHistory = async (email) => {
    try {
      const response = await fetch(`https://medicine-website-two.vercel.app/api/orders/${email}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white overflow-hidden shadow-md rounded-lg w-full">
            <div className="px-6 py-4">
              <div className="text-xl font-bold mb-2">Order ID: {order.orderId}</div>
              <p className="text-gray-700 text-base mb-2">Order Date: {order.orderDate}</p>
              <ul className="text-gray-700 text-base mb-2">
                {order.cartItems.map((item) => (
                  <li key={item._id}>
                    Product : {item.Name}
                    <br />
                    Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 text-base">Total: ${order.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
