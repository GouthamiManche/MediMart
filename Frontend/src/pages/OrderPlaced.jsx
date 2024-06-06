import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

const OrderPlaced = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getorderdetails/${orderId}`);
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
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-5xl  border border-[1px] border-gray-400 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className=" py-6  bg-[#125872]  px-8">
          <h1 className="text-4xl font-bold text-white text-center mb-4">Thank You for Your Order!</h1>
          <p className="text-white text-center">Your order has been placed successfully.</p>
        </div>
        <div className="py-8 px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-[#125872] mb-4">Order Summary</h2>
              {orderDetails && (
                <div className=" rounded-lg  border border-[1px] border-gray-200 p-6">
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-bold">Order Number:</span>
                      <span className="text-gray-800">{orderDetails._id}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-bold">Order Date:</span>
                      <span className="text-gray-800">{orderDetails.orderDate}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-bold">Payment Method:</span>
                      <span className="text-gray-800">{orderDetails.paymentStatus}</span>
                    </div>
                  </div>
                  <div>
                    {orderDetails.cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between mb-4 p-4 rounded-lg bg-white transition-all duration-300"
                      >
                        <img
                          className="w-16 h-16 object-cover rounded-lg"
                          src={item.Image_URL}
                          alt={item.Name}
                        />
                        <div className="flex-1 ml-4">
                          <p className="font-bold text-lg text-[#125872]">{item.Name}</p>
                          <p className="text-gray-600">₹{item.Price} x {item.quantity}</p>
                        </div>
                        <div className="text-gray-800 font-bold">₹{orderDetails.subtotal}</div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-bold">Sub Total:</span>
                      <span className="text-gray-800 font-bold">₹{orderDetails.subtotal}</span>
                    </div>

                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-bold">Discount:</span>
                      <span className="text-gray-800 font-bold">- ₹{orderDetails.discount}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600 font-bold">Shipping:</span>
                      <span className="text-gray-800 font-bold">+ ₹{orderDetails.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-[#125872]">
                      <span>Order Total:</span>
                      <span>₹{orderDetails.amount }</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#125872] mb-4">Billing Address</h2>
              {orderDetails && (
                <div className="rounded-lg  border border-[1px] border-gray-200 p-6">
                  <p className="text-gray-800 mb-2"><span className="font-bold">Name: </span>{orderDetails.fullName}</p>
                  <p className="text-gray-800 mb-2"><span className="font-bold">Address: </span>{orderDetails.address}</p>
                  <p className="text-gray-800 mb-2"><span className="font-bold">Email: </span>{orderDetails.email}</p>
                  <p className="text-gray-800 mb-2"><span className="font-bold">Pincode: </span>{orderDetails.pincode}</p>
                  <p className="text-gray-800 mb-2"><span className="font-bold">State: </span>{orderDetails.state}</p>
                  <p className="text-gray-800 mb-2"><span className="font-bold">City: </span>{orderDetails.city}</p>
                </div>
              )}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-[#125872] mb-4">What's Next?</h2>
                <p className="text-gray-600 mb-4">We are processing your order and will notify you once it has been shipped. You can track your order status and view your order history.</p>
                <Link to="/orderhistory">
                  <button className="bg-[#125872] text-white font-bold py-2 px-4 rounded-lg  border border-[1px] border-gray-200 hover:bg-opacity-90 transition duration-300 w-full">
                    View Your Orders
                  </button>
                </Link>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-bold text-[#125872] mb-4">Need Help?</h2>
                <p className="text-gray-600 mb-4">If you have any questions about your order, feel free to contact our support team.</p>
                <Link to="/contact">
                  <button className="bg-[#125872] text-white font-bold py-2 px-4 rounded-lg  border border-[1px] border-gray-200 hover:bg-opacity-90 transition duration-300 w-full">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;