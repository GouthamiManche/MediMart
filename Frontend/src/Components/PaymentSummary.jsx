import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { FaPercentage } from 'react-icons/fa';

const PaymentSummary = ({ cartItems, handleSubmit }) => {
  const [showCouponPopup, setShowCouponPopup] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const calculateDiscount = () => {
    return (getCartTotal() * discountPercentage) / 100;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
  };

  const handleApplyCoupon = () => {
    const validCoupons = ['SAVE10', 'GET20', 'DISCOUNT30', 'FIRST50'];

    if (!coupon) {
      setDiscountPercentage(0);
    }

    if (validCoupons.includes(coupon)) {
      let discountPercentage = 0;
      switch (coupon) {
        case 'SAVE10':
          discountPercentage = 10;
          break;
        case 'GET20':
          discountPercentage = 20;
          break;
        case 'DISCOUNT30':
          discountPercentage = 30;
          break;
        case 'FIRST50':
          discountPercentage = 50;
          break;
        default:
          discountPercentage = 0;
          break;
      }

      setDiscountPercentage(discountPercentage);
      toast.success('Coupon applied successfully', { autoClose: 2000 });
    } else {
      toast.error('Invalid coupon', { autoClose: 2000 });
    }

    setShowCouponPopup(false);
    setCoupon('');
  };

  return (
    <>
      {/* Desktop View */}
      <div className="w-[30%] p-[2rem] h-full border border-gray-300 sticky top-10 rounded-md md:block hidden ">
        <h2 className="text-2xl font-bold mb-4">Order Total</h2>
        <div className="bg-white">
          <div className="flex justify-between mb-2">
            <p className="text-gray-500">Subtotal</p>
            <p className="font-semibold">{`₹${getCartTotal()}`}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-500">Discount</p>
            <p className="font-semibold">{`-₹${calculateDiscount()}`}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-500">Delivery Fee</p>
            <p className="font-semibold">₹0</p>
          </div>
          <div className="border-t border-gray-300 pt-4 flex justify-between">
            <p className="font-bold">Total</p>
            <p className="font-bold">{`₹${cartItems.reduce((total, item) => total + item.Price * item.quantity, 0) - calculateDiscount()}`}</p>
          </div>
          <div className="mt-4">
          <button
              onClick={() => setShowCouponPopup(true)}
              className=" text-[#125872] border border-[#125872] font-semibold w-full py-2 rounded-md"
            >
           <FaPercentage className="inline-block mr-2" />
              Apply Coupon
            </button>
          </div>
          <button onClick={handleSubmit} className="bg-[#125872] text-white font-semibold w-full py-3 rounded-md mt-4">
            Checkout
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {cartItems.length > 0 && (
          <div className="bg-white rounded-md p-4">
            <h2 className="text-2xl font-bold mb-4">Order Total</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-semibold">{`₹${getCartTotal()}`}</p>
            </div>
            <button
              onClick={() => setShowCouponPopup(true)}
              className=" text-[#125872] font-semibold w-full py-2 rounded-md"
            >
         
              Apply Coupon
            </button>
            <button onClick={handleSubmit} className="bg-[#125872] text-white font-semibold w-full py-3 rounded-md mt-4">
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Coupon Popup */}
      {showCouponPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-4 w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Apply Coupon</h2>
              <button onClick={() => setShowCouponPopup(false)}>
                <AiOutlineClose className="text-xl" />
              </button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-[#125872] text-white font-semibold px-4 py-2 rounded-md ml-2"
              >
                Apply
              </button>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex items-center mb-4">
                <img src="/truemeds-logo.png" alt="Truemeds" className="h-6 mr-2" />
                <p className="font-semibold">FIRST23</p>
              </div>
              <p className="mb-2">FLAT 23% off on first order</p>
              <p className="text-gray-500 mb-4">
                Get FLAT 23% off on your medicine for first-time users. Minimum order value Rs 999
                <br />
                Expires in 146 days
                <br />
                <a href="#" className="text-blue-500 underline">
                  Terms &amp; Conditions
                </a>
              </p>
              <button className="bg-[#125872] text-white font-semibold w-full py-2 rounded-md">Apply</button>
            </div>
            {/* Add more coupon options */}
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentSummary;