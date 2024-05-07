const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST route to create a new payment order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = {
      amount: amount * 100, // Amount in smallest currency unit (e.g., paise for INR)
      currency,
      receipt: `order_${Date.now()}`,
      payment_capture: 1, // Auto-capture payment
    };

    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;