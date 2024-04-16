const jwt = require('jsonwebtoken');
const Data = require('../models/product.model');

const getData = async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error); // Log the actual error for debugging purposes
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getData };
