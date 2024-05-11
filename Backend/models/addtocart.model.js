const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    Product_id: { type: Number, required: true },
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    Image_URL :{type:String,required:true},
    email:{type:String,required:true}
  });

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
