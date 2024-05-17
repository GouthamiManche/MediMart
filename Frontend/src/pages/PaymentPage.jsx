// PaymentPage.jsx

import React, { useState } from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Load the Razorpay script dynamically
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
  
      // Wait for the script to load
      script.onload = async () => {
        // Make a POST request to your backend endpoint to create a new payment order
        const response = await axios.post('http://localhost:4000/api/create-order', {
          amount: amount,
          currency: 'INR',
        });
  
        // Extract the orderId from the response
        const { id } = response.data;
  
        // Call the Razorpay checkout function to open the payment form
        const options = {
          key: 'rzp_test_5SZr51HRqWorlQ',
          amount: amount * 100, // Amount in smallest currency unit (e.g., paise for INR)
          currency: 'INR',
          order_id: id,
          handler: function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);
          },
          prefill: {
            name: 'John Doe',
            email: 'example@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Your Address',
          },
          theme: {
            color: '',
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
  
      // Handle script loading error
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
      };
    } catch (error) {
      console.error('Error creating payment order:', error);
    }
  };
  return (
    <div>
      <h2>Payment Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount (INR):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentPage;
