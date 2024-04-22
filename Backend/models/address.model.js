const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true, },
    contactNo: { type: Number, required: true, }
});
const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
