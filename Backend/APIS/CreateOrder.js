const uuid = require('uuid');
const Razorpay = require('razorpay');
const OrderDetail = require('../models/orderdetails.model');

const CreateOrder = async (req, res) => {
  try {
    const { fullName, address, city, state, pincode, contactNo, amount, cartItems, email } = req.body;

    // Validate input fields
    if (!fullName || !address || !city || !state || !pincode || !contactNo || !amount || !cartItems || !email ) {
      console.error("Validation error: Missing required fields");
      return res.status(400).json({ error: "All fields including cartItems, email, and Image_URL are required" });
    }

    const orderDate = new Date().toLocaleDateString('en-GB');

    const newOrder = new OrderDetail({
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
      cartItems
    });

    await newOrder.save();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in smallest currency unit (e.g., paise for INR)
      currency: "INR",
      receipt: `receipt_order_${newOrder._id}`,
      payment_capture: 1, // auto capture
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      console.error("Error creating Razorpay order");
      return res.status(500).send("Error creating Razorpay order");
    }

    res.status(201).json({
      message: "Order created successfully",orderDetails: {
        orderId: order.id,
        amount: order.amount,
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
