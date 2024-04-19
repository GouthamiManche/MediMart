const Address = require ('../models/address.model')
const createAddress = async (req, res) => {
    try {
      const newAddress = new Address(req.body);
      await newAddress.validate();
      const savedAddress = await newAddress.save();
      res.status(201).send("Address Added Successfully");
    } catch (err) {
      res.status(400).send(err.message);
    }
  };

  module.exports={ createAddress};