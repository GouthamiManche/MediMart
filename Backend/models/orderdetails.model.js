const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    fullName: { type: String},
    address: { type: String},
    city: { type: String},
    state: { type: String},
    pincode: { type: String},
    contactNo: { type: Number},
    total: { type: Number}, // Add this field for total price
    userDetails: { type: Object }, // Add this field for user details
});
const Order = mongoose.model('Order_Detail', orderSchema);
module.exports = Order;
