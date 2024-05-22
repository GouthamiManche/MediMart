const jwt = require('jsonwebtoken');
const Data = require('../models/product.model');

const getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addProduct = async (req, res) => {
  const newProduct = new Data({
      Product_id: req.body.Product_id,
      Category: req.body.Category,
      Sub_Category: req.body.Sub_Category,
      Name: req.body.Name,
      Composition: req.body.Composition,
      Uses: req.body.Uses,
      Side_effects: req.body.Side_effects,
      Image_URL: req.body.Image_URL,
      Manufacturer: req.body.Manufacturer,
      Price: req.body.Price,
      Return_Policy: req.body.Return_Policy,
      Directions_for_Use: req.body.Directions_for_Use
  });

  try {
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Function to update an existing product by Product_id
const updateProduct = async (req, res) => {
  try {
      const updatedProduct = await Data.findOneAndUpdate(
          { Product_id: req.params.Product_id },
          { $set: req.body },
          { new: true }
      );
      if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(updatedProduct);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Function to delete a product by Product_id
const deleteProduct = async (req, res) => {
  try {
      const deletedProduct = await Data.findOneAndDelete({ Product_id: req.params.Product_id });
      if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

module.exports = { getData ,addProduct,updateProduct,deleteProduct};
