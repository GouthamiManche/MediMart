import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { LuBadgePercent } from 'react-icons/lu';
import CouponModal from './CouponModal'; // Import the CouponModal component

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

  const handleApplyCoupon = (couponCode) => {
    const validCoupons = ['SAVE10', 'GET20', 'DISCOUNT30', 'FIRST50'];

    if (validCoupons.includes(couponCode)) {
      let discountPercentage = 0;
      switch (couponCode) {
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
      <div className="w-[30%] p-[2rem] h-full border border-gray-300 sticky top-24 rounded-md md:block hidden shadow-md">
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
            <p className="font-bold">{`₹${getCartTotal() - calculateDiscount()}`}</p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setShowCouponPopup(true)}
              className=" text-[#125872] border border-[#125872] font-semibold w-full py-2 rounded-md"
            >
              <LuBadgePercent className="inline-block text-xl mr-2" />
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
            
            {/* Display Discount */}
            {discountPercentage > 0 && (
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-500">Discount</p>
                <p className="font-semibold">{`-₹${calculateDiscount()}`}</p>
              </div>
            )}
            {/* Calculate and Display Total */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">Total</p>
              <p className="font-semibold">{`₹${getCartTotal() - calculateDiscount()}`}</p>
            </div>
            {/* Apply Coupon Button */}
            <button
              onClick={() => setShowCouponPopup(true)}
              className=" text-[#125872] border border-[#125872] font-semibold w-full py-2 rounded-md"
            >
              <LuBadgePercent className="inline-block text-xl mr-2" />
              Apply Coupon
            </button>
            {/* Checkout Button */}
            <button onClick={handleSubmit} className="bg-[#125872] text-white font-semibold w-full py-3 rounded-md mt-4">
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Coupon Popup */}
      {showCouponPopup && (
        <CouponModal onClose={() => setShowCouponPopup(false)} onApply={handleApplyCoupon} />
      )}
    </>
  );
};

export default PaymentSummary;
