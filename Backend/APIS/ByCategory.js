const Data = require('../models/product.model');

const getProductsByCategory = async (req, res) => {
  const { category, sub_category } = req.query || {};
  try {
    if (!category && !sub_category) {
      return res.status(400).json({ message: 'Please provide a valid search criteria (category or sub_category)' });
    }

    // Decode and replace dashes with spaces for category and sub_category
    const decodedCategory = category ? decodeURIComponent(category).replace(/-/g, ' ') : null;
    const decodedSubCategory = sub_category ? decodeURIComponent(sub_category).replace(/-/g, ' ') : null;

    // Convert category and sub_category to lowercase and uppercase
    const lowerCaseCategory = decodedCategory ? decodedCategory.toLowerCase() : null;
    const upperCaseCategory = decodedCategory ? decodedCategory.toUpperCase() : null;
    const lowerCaseSubCategory = decodedSubCategory ? decodedSubCategory.toLowerCase() : null;
    const upperCaseSubCategory = decodedSubCategory ? decodedSubCategory.toUpperCase() : null;

    let query = {};
    // Query with lowercase and uppercase
    if (lowerCaseCategory || upperCaseCategory) {
      query.Category = { $regex: new RegExp(lowerCaseCategory || upperCaseCategory, 'i') };
    }
    if (lowerCaseSubCategory || upperCaseSubCategory) {
      query.Sub_Category = { $regex: new RegExp(lowerCaseSubCategory || upperCaseSubCategory, 'i') };
    }

    let products = await Data.find(query);

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
