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
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pincode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.orderDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.state}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.pincode}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.contactNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.paymentStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ul>
                    {order.cartItems.map((item) => (
                      <li key={item._id}>
                        {item.Name} - {item.quantity} x ${item.Price}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;
