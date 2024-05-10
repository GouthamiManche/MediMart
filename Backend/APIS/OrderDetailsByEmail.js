const OrderDetail = require('../models/orderdetails.model');

const getOrderDetailsByEmail = async (req, res) => {
  try {
    const email = req.params.email; // Assuming email is passed as a URL parameter
    const orders = await OrderDetail.find({ email: email });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for the provided email" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching order details:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getOrderDetailsByEmail };