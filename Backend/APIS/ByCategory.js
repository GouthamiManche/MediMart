const Data = require('../models/product.model');

const getProducts = async (req, res) => {
  const { category, sub_category } = req.query || {};
  try {
    if (!category) {
      return res.status(400).json({ message: 'Please provide a valid search criteria (category)' });
    }
    let query = { Category: category };
    if (sub_category) {
      query.Sub_Category = sub_category;
    }
    let products = await Data.find(query);
    console.log('Received query parameters:', category, sub_category);
    if (products.length === 0) {
      return res.status(404).json({ message: 'No data found for the given category and sub-category' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { getProducts };

