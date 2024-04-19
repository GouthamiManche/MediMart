const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    fullName: String,
    address: String,
    apartment: String,
    locality: String,
    city: String,
    state: String,
    pincode: String,
    contactNo: String,
    saveAs: { type: String, enum: ['home', 'office', 'other'] },
  });

  const Address = mongoose.model('Address', addressSchema);