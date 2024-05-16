const uuid = require('uuid');
const OrderDetail = require('../models/orderdetails.model');

const CreateOrder = async (req, res) => {
  try {
    const { fullName, address, city, state, pincode, contactNo, amount, cartItems, email, Image_URL } = req.body;

    // Validate input fields
    if (!fullName || !address || !city || !state || !pincode || !contactNo || !amount || !cartItems || !email || !Image_URL) {
      return res.status(400).json({ error: "All fields including cartItems, email, and Image_URL are required" });
    }

    // Generate a unique orderId using UUID
    const orderId = uuid.v4();

    const orderDate = new Date().toLocaleDateString('en-GB');

    const newOrder = new OrderDetail({
      orderId,
      fullName,
      contactNo,
      address,
      email,
      pincode,
      state,
      city,
      amount,
      orderDate,
      paymentStatus: 'not completed',
      cartItems,
      Image_URL, // Include Image_URL field
    });

    // Save the new order document
    await newOrder.save();

    // Get the Razorpay key from environment variables
    const key = process.env.RAZORPAY_KEY_ID; // Ensure this is set in your environment

    res.status(201).json({
      message: "Order created successfully",
      orderId: orderId,
      amount: amount, // Ensure this is in paise if required
      key: key,
      email: email,
      fullName: fullName,
      orderDate: orderDate,
      Image_URL: Image_URL
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

module.exports = { CreateOrder };
