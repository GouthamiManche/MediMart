const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    Medicine_Name: String,
    Composition: String,
    Image_URL: String,
    price: Number,
    Manufacturer: String,
    items: [{
      itemId: {
       type:Number,
       ref: 'Item',
       required: true
    },
    quantity: {
       type: Number,
       required: true},
     }],
    bill: {
        type: Number,
        required: true,
       default: 0
      }
    }, {
    timestamps: true
    })
const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart