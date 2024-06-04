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

const addBanner = async (req, res) => {
  try {
    const { Title, Image } = req.body;

    if (!Title || !Image) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBanner = new Banner({
      Title,
      Image
    });

    await newBanner.save();

    res.status(201).json(newBanner);
  } catch (error) {
    console.error('Error adding new banner:', error);
    res.status(500).send('Server error');
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Missing banner ID' });
    }

    const deletedBanner = await Banner.findByIdAndDelete(id);

    if (!deletedBanner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Error deleting banner:', error);
    res.status(500).send('Server error');
  }
};

module.exports = { getBanner, updateBanner, addBanner, deleteBanner };
