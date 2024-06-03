const User = require('../models/user.model');

// Add new address
async function addAddress(req, res) {
  const userEmail = req.body.email;  // Assuming email is sent in the request body
  const newAddress = req.body.address;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.addresses.push(newAddress);
    await user.save();
    res.status(200).send(user.addresses);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Fetch addresses
async function getAddresses(req, res) {
    const userEmail = req.query.email; // Using query parameters
  
    try {
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      res.status(200).send(user.addresses);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

module.exports = {
  addAddress,
  getAddresses
};
