// //const asyncHandler = require('../middleware/asyncHandler');
// const User = require('../models/user.model');

// const register = asyncHandler(async (req, res, next) => {
//   const { username, email, password } = req.body;

//   // Check if username or email already exists
//   const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//   if (existingUser) {
//     return next(new ErrorResponse(400, 'Username or email already exists'));
//   }

//   const newUser = new User({ username, email, password });
//   await newUser.save();

//   res.status(201).json({ message: 'User registered successfully' });
// });

// module.exports = { register };
