const Banner = require('../models/banner.model');

const getBanner = async (req, res) => {
    try {
      const banners = await Banner.find(); // Should work now
      res.json(banners);
    } catch (error) {
      console.error('Error fetching banner photos:', error);
      res.status(500).send('Server error');
    }
  };

  const updateBanner = async (req, res) => {
    try {
      const { id } = req.params;
      const { Title, Image } = req.body;
  
      if (!id || !Title || !Image) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const updatedBanner = await Banner.findByIdAndUpdate(
        id,
        { Title, Image },
        { new: true }
      );
  
      if (!updatedBanner) {
        return res.status(404).json({ message: 'Banner not found' });
      }
  
      res.json(updatedBanner);
    } catch (error) {
      console.error('Error updating banner:', error);
      res.status(500).send('Server error');
    }
  };
  
module.exports = { getBanner, updateBanner };