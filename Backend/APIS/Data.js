const jwt = require('jsonwebtoken');
const Data = require('../models/data.model');
const Category = require('../models/category.model');

const checkAccess = (req, res, next) => {
    const { apikey, authorization } = req.headers;
      
    if (apikey === "123") {
      next();
    } else if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7);
      jwt.verify(token,process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid JWT token' });
        } else {
          req.user = decoded;
          next(); 
        }
      });
    } else {
      return res.status(403).json({ error: 'Invalid API key or JWT token' });
    }
  };
  
  async function getAllData(req, res) {
    try {
      const data = await Data.find();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
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
  