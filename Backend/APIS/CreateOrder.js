// const Order = require('../models/orderdetails.model');

// const CreateOrder = async (req, res) => {
//   try {
//     const { fullName, address, city, state, pincode, contactNo } = req.body;

//     // if (isNaN(total)) {
//     //   throw new Error("Total is not a valid number");
//     // }

//     // if (!cartItems || cartItems.length === 0) {
//     //   throw new Error("Cart items are required");
//     // }

//     // Validate each item in the cartItems array
//     // const validatedCartItems = cartItems.filter(item => {
//     //   if (!item.Product_id || !item.Price) {
//     //     console.error("Invalid cart item:", item);
//     //     return false;
//     //   }
//     //   return true;
//     // });

//     // if (validatedCartItems.length === 0) {
//     //   throw new Error("No valid cart items found");
//     // }

//     // const orderItems = validatedCartItems.map(item => ({
//     //   product_id: item.Product_id,
//     //   name: item.Name,
//     //   quantity: item.quantity,
//     //   price: parseFloat(item.Price)
//     // }));

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
