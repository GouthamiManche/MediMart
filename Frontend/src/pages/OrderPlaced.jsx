import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import LoadingGif from "../Components/LoadingGif";

const OrderPlaced = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="min-h-screen py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="py-6 bg-[#125872] px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-2 sm:mb-4">Thank You for Your Order!</h1>
          <p className="text-white text-center text-sm sm:text-base">Your order has been placed successfully.</p>
        </div>
        <div className="py-6 px-4 sm:py-8 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#125872] mb-4">Order Summary</h2>
              {orderDetails && (
                <div className="rounded-lg border border-gray-200 p-4 sm:p-6">
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-bold text-sm sm:text-base">Order Number:</span>
                      <span className="text-gray-800 text-sm sm:text-base">{orderDetails._id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-bold text-sm sm:text-base">Order Date:</span>
                      <span className="text-gray-800 text-sm sm:text-base">{orderDetails.orderDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 font-bold text-sm sm:text-base">Payment Method:</span>
                      <span className="text-gray-800 text-sm sm:text-base">{orderDetails.paymentStatus}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {orderDetails.cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-white shadow-sm"
                      >
                        <img
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                          src={item.Image_URL}
                          alt={item.Name}
                        />
                        <div className="flex-1 ml-4">
                          <p className="font-bold text-sm sm:text-lg text-[#125872]">{item.Name}</p>
                          <p className="text-gray-600 text-xs sm:text-sm">₹{item.Price} x {item.quantity}</p>
                        </div>
                        <div className="text-gray-800 font-bold text-sm sm:text-base">₹{item.Price*item.quantity}</div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-bold text-sm sm:text-base">Sub Total:</span>
                      <span className="text-gray-800 font-bold text-sm sm:text-base">₹{orderDetails.subtotal}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 font-bold text-sm sm:text-base">Discount:</span>
                      <span className="text-gray-800 font-bold text-sm sm:text-base">- ₹{orderDetails.discount}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600 font-bold text-sm sm:text-base">Shipping:</span>
                      <span className="text-gray-800 font-bold text-sm sm:text-base">+ ₹{orderDetails.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg sm:text-xl text-[#125872]">
                      <span>Order Total:</span>
                      <span>₹{orderDetails.amount}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#125872] mb-4">Billing Address</h2>
              {orderDetails && (
                <div className="rounded-lg border border-gray-200 p-4 sm:p-6">
                  <p className="text-gray-800 mb-2 text-sm sm:text-base"><span className="font-bold">Name: </span>{orderDetails.fullName}</p>
                  <p className="text-gray-800 mb-2 text-sm sm:text-base"><span className="font-bold">Address: </span>{orderDetails.address}</p>
                  <p className="text-gray-800 mb-2 text-sm sm:text-base"><span className="font-bold">Email: </span>{orderDetails.email}</p>
                  <p className="text-gray-800 mb-2 text-sm sm:text-base"><span className="font-bold">Pincode: </span>{orderDetails.pincode}</p>
                  <p className="text-gray-800 mb-2 text-sm sm:text-base"><span className="font-bold">State: </span>{orderDetails.state}</p>
                  <p className="text-gray-800 mb-2 text-sm sm:text-base"><span className="font-bold">City: </span>{orderDetails.city}</p>
                </div>
              )}
              <div className="mt-6 sm:mt-8">
                <h2 className="text-lg sm:text-xl font-bold text-[#125872] mb-3 sm:mb-4">What's Next?</h2>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">We are processing your order and will notify you once it has been shipped. You can track your order status and view your order history.</p>
                <Link to="/orderhistory">
                  <button className="bg-[#125872] text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-opacity-90 transition duration-300 text-sm sm:text-base">
                    View Your Orders
                  </button>
                </Link>
              </div>
              <div className="mt-6 sm:mt-8">
                <h2 className="text-lg sm:text-xl font-bold text-[#125872] mb-3 sm:mb-4">Need Help?</h2>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">If you have any questions about your order, feel free to contact our support team.</p>
                <Link to="/contact">
                  <button className="bg-[#125872] text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-opacity-90 transition duration-300 text-sm sm:text-base">
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