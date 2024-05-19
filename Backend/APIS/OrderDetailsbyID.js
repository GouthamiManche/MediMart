
const OrderDetail = require('../models/orderdetails.model');

// Fetch order details by orderId
const getOrderDetailsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Assuming orderId corresponds to razorpay_order_id
    const order = await OrderDetail.findOne({ razorpay_order_id: orderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error('Error fetching order details by orderId:', error);
    res.status(500).json({ error: 'Failed to fetch order details by orderId' });
  }
};

module.exports = { getOrderDetailsByOrderId };
