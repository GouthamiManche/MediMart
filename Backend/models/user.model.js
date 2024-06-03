const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  fullName: String,
  contactNo: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  customerId: { type: String, unique: true, sparse: true },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
  fullName: String,
  contactNumber: String,
  deliveryAddress: String,
  profilePic: String,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Other'
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: (value) => {
        return value instanceof Date && !isNaN(value.valueOf());
      },
      message: 'Invalid date format',
    },
  },
  resetPasswordToken:{type:String},
  resetPasswordExpires:{type:String},
  addresses: [addressSchema], 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
