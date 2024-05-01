const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    contactNo: { type: String, required: true },
    total: { type: Number, required: true },
    userDetails: { type: Object },
    cartItems: [{ productId: String, name: String, quantity: Number, price: Number }],
  });
const Order = mongoose.model('Order_Detail', orderSchema);
module.exports = Order;
