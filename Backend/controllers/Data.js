// dataController.js file
const Data = require('../models/data.model');

async function getAllData(req, res) {
    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getAllData };
