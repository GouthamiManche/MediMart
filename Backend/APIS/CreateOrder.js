const Order = require('../models/orderdetails.model');
const CreateOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
    });
    await newOrder.validate();
    const savedOrder = await newOrder.save();
    res.status(201).send("Order Added Successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { CreateOrder };
