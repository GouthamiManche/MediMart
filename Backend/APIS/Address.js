const User = require('../models/user.model');

// Add new address
async function addAddress(req, res) {
  const { email, address, addressType, otherAddressName } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const newAddress = { ...address, addressType };
    if (addressType === 'Other' && otherAddressName) {
      newAddress.otherAddressName = otherAddressName;
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
  const userEmail = req.query.email;
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

// Edit address
async function editAddress(req, res) {
  const userEmail = req.body.email;
  const addressId = req.params.id;
  const updatedAddress = req.body.address;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const addressIndex = user.addresses.findIndex(addr => addr.addressId === addressId);
    if (addressIndex === -1) {
        return res.status(404).send('Address not found');
    }

    user.addresses[addressIndex] = { ...user.addresses[addressIndex], ...updatedAddress };
    await user.save();
    res.status(200).send(user.addresses);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Delete address
async function deleteAddress(req, res) {
  const userEmail = req.body.email;
  const addressId = req.params.id;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const addressIndex = user.addresses.findIndex(addr => addr.addressId === addressId);
    if (addressIndex === -1) {
      return res.status(404).send('Address not found');
    }

    user.addresses.splice(addressIndex, 1);
    await user.save();
    res.status(200).send(user.addresses);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  addAddress,
  getAddresses,
  editAddress,
  deleteAddress
};
