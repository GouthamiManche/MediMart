const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    Category:String,
    Medicine_Name: String,
    Composition: String,
    Uses: String,
    Side_effects: String,
    Image_URL: String,
    Manufacturer: String,
    Excellent_Review: Number,
    Average_Review: Number,
    Poor_Review: Number,
    Price:Number
})
const Data = mongoose.model('dataset', dataSchema);
module.exports= Data;

