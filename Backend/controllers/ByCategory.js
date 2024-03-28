const Data = require('../models/data.model');

async function getDataByCategory(req, res, category) {
  try {
    const data = await Data.find({ Category: category });
    if (data.length === 0) {
      return res.status(404).json({ error: `No data found for the ${category} category.` });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getCapsule: async (req, res) => getDataByCategory(req, res, 'Capsule'),
  getInjection: async (req, res) => getDataByCategory(req, res, 'Injection'),
  getTablet: async (req, res) => getDataByCategory(req, res, 'Tablet'),
  getCream: async (req, res) => getDataByCategory(req, res, 'Cream'),
  getDrops: async (req, res) => getDataByCategory(req, res, 'Drops'),
  getLotion: async (req, res) => getDataByCategory(req, res, 'Lotion'),
  getShampoo: async (req, res) => getDataByCategory(req, res, 'Shampoo'),
  getSoap: async (req, res) => getDataByCategory(req, res, 'Soap'),
  getSyrup: async (req, res) => getDataByCategory(req, res, 'Syrup'),
};
