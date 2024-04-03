const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId
const cartSchema = new mongoose.Schema({
  userId: String,
  items: [{
      productId: String,
      quantity: Number,
  }],
    // Image_URL: "String",
    // username : {
    //   type: ObjectID,
    //    required: true,
    //    ref: 'User'
    //  },
    // items: [{
    //   itemId: {
    //    type: Number,
    //    ref: 'Item',
    //    required: true
    // },
    // // name: String,
    // quantity: {
    //    type: Number,
    //    required: true,
    //    min: 1,
    //    default: 1},
    //    price: Number
    //  }],
    // // }, {
    // timestamps: true
    })
    const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart