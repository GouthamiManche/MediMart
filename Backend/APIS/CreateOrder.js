const Order = require('../models/orderdetails.model');

const CreateOrder = async (req, res) => {
  try {
    const { fullName, address, city, state, pincode, contactNo, total, userDetails, cartItems } = req.body;

    if (isNaN(total)) {
      throw new Error("Total is not a valid number");
    }

    const newOrder = new Order({
      fullName,
      address,
      city,
      state,
      pincode,
      contactNo,
      total,
      userDetails,
      cartItems,
    });

    await newOrder.validate();
    const savedOrder = await newOrder.save();
    res.status(201).send("Order Added Successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { CreateOrder };
