const uuid = require('uuid');
const OrderDetail = require('../models/orderdetails.model');
const CreateOrder = async (req, res) => {
  try {
    const { fullName, address, city, state, pincode, contactNo, amount, cartItems, email, Image_URL } = req.body;

    // Validate input fields
    if (!fullName || !address || !city || !state || !pincode || !contactNo || !amount || !cartItems || !email || !Image_URL) {
      throw new Error("All fields including cartItems, email, and Image_URL are required");
    }

    const orderId = Math.floor(100000 + Math.random() * 900000);

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
    const key = process.env.RAZORPAY_KEY;
    res.status(201).json({
      message: "Order created successfully",
      orderId: orderId,
      email: email,
      key: key,
      fullname: fullName,
      orderDate: orderDate,
      Image_URL: Image_URL
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(400).send(err.message);
  }
};

module.exports = { CreateOrder };