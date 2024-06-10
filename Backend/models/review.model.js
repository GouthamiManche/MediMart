const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  Product_Name: { type: String, required: true },
  Reviewer_Name: { type: String, required: true },
  Review: { type: String, required: true },
  Review_Star: { type: Number, required: true },
});

module.exports = mongoose.model('Review', ReviewSchema);
