import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { LuBadgePercent } from 'react-icons/lu';
import CouponModal from './CouponModal'; // Import the CouponModal component

const PaymentSummary = ({ cartItems, handleSubmit }) => {
  const [showCouponPopup, setShowCouponPopup] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const deliveryFee = 50; // Fixed delivery fee

  const validCoupons = {
    'SAVE10': 10,
    'GET20': 20,
    'DISCOUNT30': 30,
    'FIRST50': 50,
  };

  useEffect(() => {
    initializeLocalStorage();
  }, []);

  const initializeLocalStorage = () => {
    const storedCoupon = localStorage.getItem('coupon');
    const storedDiscountPercentage = parseInt(localStorage.getItem('discountPercentage')) || 0;
    const storedTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
    const storedDiscount = parseFloat(localStorage.getItem('discount')) || 0;

    setCoupon(storedCoupon || '');
    setDiscountPercentage(storedDiscountPercentage);
    setTotalPrice(storedTotalPrice);
    setDiscount(storedDiscount);

    // Calculate subtotal and total price with delivery fee
    const initialSubtotal = getCartTotal();
    const initialTotalPrice = calculateTotalPrice(initialSubtotal, storedDiscountPercentage);
    localStorage.setItem('subtotal', JSON.stringify(initialSubtotal));
    localStorage.setItem('deliveryFee', JSON.stringify(deliveryFee));
    localStorage.setItem('totalPrice', JSON.stringify(initialTotalPrice));
    setSubtotal(initialSubtotal);
  };


  useEffect(() => {
    if (coupon) {
      handleApplyCoupon(coupon, false);
    } else {
      updateTotalPrice(cartItems, discountPercentage);
    }
  }, [cartItems, discountPercentage]);

  const calculateDiscount = (discountPercentage) => {
    return (subtotal * discountPercentage) / 100;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);
  };

  const handleApplyCoupon = (couponCode, showToast = true) => {
    if (validCoupons[couponCode]) {
      const discount = validCoupons[couponCode];

      setDiscountPercentage(discount);
      setCoupon(couponCode);
      const discountValue = calculateDiscount(discount);
      setDiscount(discountValue);
      updateTotalPrice(cartItems, discount);

      localStorage.setItem('coupon', couponCode);
      localStorage.setItem('discountPercentage', discount.toString());
      localStorage.setItem('discount', discountValue.toString());

      if (showToast) {
        toast.success('Coupon applied successfully', { autoClose: 2000 });
      }
    } else {
      if (showToast) {
        toast.error('Invalid coupon', { autoClose: 2000 });
      }
    }

    setShowCouponPopup(false);
  };

  useEffect(() => {
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  }, [totalPrice]);

  useEffect(() => {
    localStorage.setItem('subtotal', JSON.stringify(subtotal));
  }, [subtotal]);

  useEffect(() => {
    localStorage.setItem('deliveryFee', JSON.stringify(deliveryFee));
  }, [deliveryFee]);


  const updateTotalPrice = (items, discount) => {
    const newSubtotal = getCartTotal();
    const newTotalPrice = calculateTotalPrice(newSubtotal, discount);
    localStorage.setItem('totalPrice', JSON.stringify(newTotalPrice));
    setTotalPrice(newTotalPrice);
    setSubtotal(newSubtotal);
  };

  const calculateTotalPrice = (subtotal, discount) => {
    const discountAmount = (subtotal * discount) / 100;
    const totalBeforeDelivery = subtotal - discountAmount;
    const totalWithDelivery = totalBeforeDelivery + deliveryFee;
    return totalWithDelivery;
  };

  return (
    <>
      {/* Desktop View */}
      <div className="w-[30%] p-[2rem] h-full border border-gray-300 sticky top-24 rounded-md md:block hidden shadow-md text-gray-700">
        <h2 className="text-2xl font-bold mb-4">Order Total</h2>
        <div className="bg-white">
          <div className="flex justify-between mb-2">
            <p className="text-gray-500">Subtotal</p>
            <p className="font-semibold">{`₹${subtotal}`}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-500">Discount</p>
            <p className="font-semibold">{`-₹${calculateDiscount(discountPercentage)}`}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-500">Delivery Fee</p>
            <p className="font-semibold">{`₹${deliveryFee}`}</p>
          </div>
          <div className="border-t border-gray-300 pt-4 flex justify-between">
            <p className="font-bold">Total</p>
            <p className="font-bold">{`₹${totalPrice}`}</p>
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
            Add Address
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden text-gray-700">
        {cartItems.length > 0 && (
          <div className="bg-white rounded-md p-4">
            <h2 className="text-2xl font-bold mb-4">Order Total</h2>

            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-semibold">{`₹${subtotal}`}</p>
            </div>

            {/* Display Discount */}
            {discountPercentage > 0 && (
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-500">Discount</p>
                <p className="font-semibold">{`-₹${calculateDiscount(discountPercentage)}`}</p>
              </div>

            )}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">Delivery Fee</p>
              <p className="font-semibold">{`₹${deliveryFee}`}</p>
            </div>
            {/*
             Calculate and Display Total */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">Total</p>
              <p className="font-semibold">{`₹${totalPrice}`}</p>
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
              Add Address
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
