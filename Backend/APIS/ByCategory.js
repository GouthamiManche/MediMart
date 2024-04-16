const Data = require('../models/product.model');

const getProductsByCategory = async (req, res) => {
  const { category, sub_category } = req.query || {};
  try {
    if (!category && !sub_category) {
      return res.status(400).json({ message: 'Please provide a valid search criteria (category or sub_category)' });
    }
    // Convert category and sub_category to lowercase and uppercase
    const lowerCaseCategory = category ? category.toLowerCase() : null;
    const upperCaseCategory = category ? category.toUpperCase() : null;
    const lowerCaseSubCategory = sub_category ? sub_category.toLowerCase() : null;
    const upperCaseSubCategory = sub_category ? sub_category.toUpperCase() : null;

    let query = {};
    // Query with lowercase and uppercase
    if (lowerCaseCategory || upperCaseCategory) {
      query.Category = { $regex: new RegExp(lowerCaseCategory || upperCaseCategory, 'i') };
    }
    if (lowerCaseSubCategory || upperCaseSubCategory) {
      query.Sub_Category = { $regex: new RegExp(lowerCaseSubCategory || upperCaseSubCategory, 'i') };
    }

    let products = await Data.find(query);
    console.log('Category:', lowerCaseCategory || upperCaseCategory);
    console.log('Sub Category:', lowerCaseSubCategory || upperCaseSubCategory);
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'No data found for the given category and sub-category' });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getProductsByCategory };
