const Address = require ('../models/orderdetails.model')
const CreateOrder = async (req, res) => {
  try {
      const newAddress = new Address({
          ...req.body,
          total: req.body.total, // Assuming the total price is sent in the request body
          userDetails: req.body.userDetails, // Assuming user details are sent in the request body
      });
      await newAddress.validate();
      const savedAddress = await newAddress.save();
      res.status(201).send("Order Added Successfully");
  } catch (err) {
      res.status(400).send(err.message);
  }
};

  module.exports={ CreateOrder};