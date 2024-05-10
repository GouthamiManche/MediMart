const uuid = require('uuid');
const OrderDetail = require('../models/orderdetails.model');

const CreateOrder = async (req, res) => {
  try {
    const { fullName, address, city, state, pincode, contactNo, total, cartItems, email } = req.body;

    // Validate input fields
    if (!fullName || !address || !city || !state || !pincode || !contactNo || !total || !cartItems || !email) {
      throw new Error("All fields including cartItems and email are required");
    }

    // Generate orderId as a 6-digit number
    const orderId = Math.floor(100000 + Math.random() * 900000);

    const orderDate = new Date().toLocaleDateString('en-GB'); // Get current date in dd/mm/yyyy format

    // Create a new order document with cartItems
    const newOrder = new OrderDetail({
      orderId,
      fullName,
      contactNo,
      address,
      email,
      pincode,
      state,
      city,
      total,
      orderDate,
      paymentStatus: 'not completed',
      cartItems,
    });

    // Save the new order document
    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      orderId: orderId,
      email: email,
      fullname: fullName,
      orderDate: orderDate
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(400).send(err.message);
  }
};

module.exports = { CreateOrder };
