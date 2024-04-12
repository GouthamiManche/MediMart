const mongoose = require('mongoose');
const cartItemSchema = new mongoose.Schema({
  product: {
    name: String,
    image: String,
    price: Number,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);