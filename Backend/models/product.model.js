const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    contactNo: { type: String, required: true },
    total: { type: Number, required: true }, // Ensure total is defined as a number
    userDetails: { type: Object },
    // Use an array of orderItemSchema to store multiple items
    items: [orderItemSchema]
});
const Order = mongoose.model('Order_Detail', orderSchema);
module.exports = Order;
