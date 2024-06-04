const crypto = require('crypto');
const OrderDetail = require('../models/orderdetails.model');

async function ValidateOrder(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }
  try {
    const updatedOrder = await OrderDetail.findOneAndUpdate(
      { razorpay_order_id: razorpay_order_id },
      {
        paymentStatus: 'Completed',
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
      },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("Error updating order details:", err);
    res.status(500).json({ error: "Failed to update order details" });
  }
}

module.exports = {ValidateOrder};
