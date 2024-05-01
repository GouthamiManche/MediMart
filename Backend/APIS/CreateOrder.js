const Order = require('../models/orderdetails.model');

const CreateOrder = async (req, res) => {
  try {
    const { address, cartItems } = req.body;
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const newOrder = new Order({
      ...address,
      cartItems,
      total,
    });

    await newOrder.validate();
    const savedOrder = await newOrder.save();
    res.status(201).send("Order Added Successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { CreateOrder };
