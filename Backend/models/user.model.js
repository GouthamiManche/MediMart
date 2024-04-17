const mongoose = require('mongoose');
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
          // Regular expression to validate email format
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email format',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
    }
  });

  const User = mongoose.model('User', userSchema);
  module.exports = User;
