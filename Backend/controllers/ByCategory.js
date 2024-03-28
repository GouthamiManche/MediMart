const Data = require('../models/data.model'); // Assuming Data is your Mongoose model

async function getCapsule(req, res) {
  try {
    const data = await Data.find({ Category: "Capsule" });

    if (data.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified category.' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function getTablet(req, res) {
    try {
      const data = await Data.find({ Category: "Tablet" });
      if (data.length === 0) {
        return res.status(404).json({ error: 'No data found for the specified category.' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async function getInjection(req, res) {
    try {
      const data = await Data.find({ Category: "Injection" });
      if (data.length === 0) {
        return res.status(404).json({ error: 'No data found for the specified category.' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async function getSyrup(req, res) {
    try {
      const data = await Data.find({ Category: "Syrup" });
      if (data.length === 0) {
        return res.status(404).json({ error: 'No data found for the specified category.' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async function getCream(req, res) {
    try {
      const data = await Data.find({ Category: "Cream" });
      if (data.length === 0) {
        return res.status(404).json({ error: 'No data found for the specified category.' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async function getDrops(req, res) {
    try {
      const data = await Data.find({ Category: "Drops" });
      if (data.length === 0) {
        return res.status(404).json({ error: 'No data found for the specified category.' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async function getSoap(req, res) {
    try {
      const data = await Data.find({ Category: "Soap" });
      if (data.length === 0) {
        return res.status(404).json({ error: 'No data found for the specified category.' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async function getShampoo(req, res) {
    try {
      const data = await Data.find({ Category: "Shampoo" });
      if (data.length === 0) {
        return res.status(404).json({ error: 'No data found for the specified category.' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async function getLotion(req, res) {
    try {
      const data = await Data.find({ Category: "Lotion" });
      if (data.length === 0) {
        return res.status(404).json({ error: 'No data found for the specified category.' });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = { getCapsule,getInjection,getTablet,getCream,getDrops,getLotion,getShampoo,getSoap,getSyrup};

