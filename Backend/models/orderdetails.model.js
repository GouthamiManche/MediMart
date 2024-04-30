const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    contactNo: { type: Number, required: true },
    total: { type: Number, required: true }, // Add this field for total price
    userDetails: { type: Object }, // Add this field for user details
});
const Address = mongoose.model('Address', orderSchema);
module.exports = Address;
