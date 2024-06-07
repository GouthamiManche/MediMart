const uuid = require('uuid');
const Razorpay = require('razorpay');
const OrderDetail = require('../models/orderdetails.model');
const CreateOrder = async (req, res) => {
  try {
    const { fullName, address, city, state, pincode, contactNo, amount, cartItems, email, subtotal, discount, deliveryFee } = req.body;

    // Validate input fields
    if (!fullName || !address || !city || !state || !pincode || !contactNo || !amount || !cartItems || !email) {
      console.error("Validation error: Missing required fields");
      return res.status(400).json({ error: "All fields including cartItems and email are required" });
    }

    const orderDate = new Date().toLocaleString('en-GB'); // Format date and time into a string

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay order options with a shorter receipt string
    const receiptId = `rcpt_${uuid.v4().substring(0, 8)}`;
    const options = {
      amount: amount * 100, // amount in smallest currency unit (e.g., paise for INR)
      currency: "INR",
      receipt: receiptId,
      payment_capture: 1, // auto capture
    };

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      console.error("Error creating Razorpay order");
      return res.status(500).send("Error creating Razorpay order");
    }

    // Create new order in MongoDB
    const newOrder = new OrderDetail({
      fullName,
      contactNo,
      address,
      email,
      pincode,
      state,
      city,
      amount,
      orderDate, // Save formatted date and time
      subtotal, // Save subtotal
      discount, // Save discount
      deliveryFee,
      paymentStatus: 'not completed',
      cartItems,
      razorpay_order_id: razorpayOrder.id, // Save Razorpay order ID
    });

    await newOrder.save();

    // Send response with order details
    res.status(201).json({
      message: "Order created successfully",
      orderDetails: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        key: process.env.RAZORPAY_KEY_ID,
        email,
        fullName,
        orderDate,
        cartItems,
        address,
        city,
        state,
        pincode,
        contactNo
      }
    });

  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

module.exports = { CreateOrder };
