import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';

const CouponModal = ({ onClose, onApply }) => {
    const [coupon, setCoupon] = useState('');

    const handleApplyCoupon = (couponCode) => {
        if (couponCode.trim() === '') {
            toast.error('Please enter a coupon code');
            return;
        }
        setCoupon(couponCode);
        onApply(couponCode);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-md overflow-auto max-h-[60vh] w-[500px]">
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Apply Coupon</h2>
                        <button onClick={onClose}>
                            <AiOutlineClose className="text-xl" />
                        </button>
                    </div>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="border border-gray-300 rounded-l-md px-2 py-1 w-full"
                        />
                        <button
                            onClick={() => handleApplyCoupon(coupon)}
                            className="bg-[#125872] text-white font-semibold px-4 py-2 rounded-r-md"
                        >
                            Apply
                        </button>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                        <div className="flex items-center mb-4">
                         
                            <p className="font-semibold">FIRST50</p>
                        </div>
                        <p className="mb-2">
                            Get 50% OFF discount on first order
                        </p>
                        <button
                            onClick={() => handleApplyCoupon('FIRST50')}
                            className="bg-[#125872] text-white font-semibold w-full py-2 rounded-md"
                        >
                            Apply
                        </button>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                        <div className="flex items-center mb-4">
                          
                            <p className="font-semibold">SAVE10</p>
                        </div>
                        <p className="mb-2">
                            Get 10% OFF on orders as medimart platform perk
                        </p>
                        <button
                            onClick={() => handleApplyCoupon('SAVE10')}
                            className="bg-[#125872] text-white font-semibold w-full py-2 rounded-md"
                        >
                            Apply
                        </button>
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                        <div className="flex items-center mb-4">
                          
                            <p className="font-semibold">DISCOUNT30</p>
                        </div>
                        <p className="mb-2">Get 30% OFF on first 3 orders</p>
                        <button
                            onClick={() => handleApplyCoupon('DISCOUNT30')}
                            className="bg-[#125872] text-white font-semibold w-full py-2 rounded-md"
                        >
                            APPLY
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default CouponModal;