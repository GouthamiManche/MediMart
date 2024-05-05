// const Order = require('../models/orderdetails.model');

// const CreateOrder = async (req, res) => {
//   try {
//     const { fullName, address, city, state, pincode, contactNo } = req.body;

//     // Validate input fields
//     if (!fullName || !address || !city || !state || !pincode || !contactNo) {
//       throw new Error("All fields are required");
//     }

//     const newOrder = new Order({
//       fullName,
//       address,
//       city,
//       state,
//       pincode,
//       contactNo,
//     });

//     await newOrder.validate();
//     const savedOrder = await newOrder.save();
//     res.status(201).send("Order Added Successfully");
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// };

// module.exports = { CreateOrder };
