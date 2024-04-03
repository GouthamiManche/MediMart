const mongoose = require('mongoose');
//const ObjectID = mongoose.Schema.Types.ObjectId
const CatSchema = new mongoose.Schema({
    Category: "String",
    Name: "String",
    Image_URL: "String",
    Price: "Number",
    Manufacturer: "String",
    Return_Policy: "String",
    Description: "String",
    Directions_for_Use: "String",
    Size: "String"
  })
const Category = mongoose.model('product2', CatSchema);
module.exports= Category;
