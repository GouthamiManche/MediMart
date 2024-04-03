const Category= require('../models/category.model');

async function getCategory(req, res) {
    try {
      const { user } = req;
      const data = await Category.find();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }
  module.exports = {getCategory};