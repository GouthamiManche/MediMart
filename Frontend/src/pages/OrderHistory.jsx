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
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white overflow-hidden shadow-md rounded-lg">
            <div className="px-6 py-4">
              <div className="text-xl font-bold mb-2">Order ID: {order.orderId}</div>
              <p className="text-black text-base mb-2">Order Date: {order.orderDate}</p>
              <ul className="text-black text-base mb-2">
                {order.cartItems.map((item) => (
                  <li key={item._id} className="flex items-center">
                    {item.Image_URL && (
                      <img src={item.Image_URL} alt={item.Name} className="w-20 h-20 object-cover mr-4" />
                    )}
                    <div>
                      <div>Product: {item.Name}</div>
                      <div>Quantity: {item.quantity}</div>
                      <div>Price: {item.Price}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-black text-base">Payment Status: {order.paymentStatus}</p>
              <p className="text-black text-base">Total: ${order.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
