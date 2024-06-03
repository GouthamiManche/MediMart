
const OrderDetail = require('../models/orderdetails.model');
//for history
const getOrderDetailsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
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

//admin apis
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderDetail.find();
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await OrderDetail.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

module.exports = { getOrderDetailsByOrderId,getAllOrders,deleteOrder };
