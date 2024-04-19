const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    apartment: String,
    locality: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true, minlength: 7, },
    contactNo: { type: Number, required: true, minlength: 10, },
    saveAs: { type: String, enum: ['home', 'office', 'other'], required: true },
});
const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
