const { verifyToken } = require('../Auth/tokenauth');
const { checkApiKey } = require('../Auth/apikeyauth');
const Data = require('../models/data.model');
const Category = require('../models/category.model');

const checkAccess = async (req, res, next) => {
  const { apikey, authorization } = req.headers;

  if (checkApiKey(apikey)) {
    next();
  } else if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')[1]; // Splitting the token using split(' ')[1]
    try {
      const data = await Data.find();
      res.status(200).json(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else {
    return res.status(403).json({ error: 'Invalid API key or JWT token' });
  }
}
  async function getAllDataCategory(req, res) {
    try {
      const data = await Category.find();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }
  
  async function getCombinedData(req, res) {
    try {
        const dataQuery = Data.find();
        const categoryQuery = Category.find();

        const [data, category] = await Promise.all([dataQuery, categoryQuery]);

        const combinedData = {
            data: data,
            category: category
        };

        res.status(200).json(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}
  module.exports = { checkAccess, getAllData,getAllDataCategory,getCombinedData};
  
