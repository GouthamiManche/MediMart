// //const asyncHandler = require('../middleware/asyncHandler');
// const User = require('../models/user.model');

// const login = asyncHandler(async (req, res, next) => {
//   const { username, password } = req.body;

//   // Check if user exists
//   const user = await User.findOne({ username });
//   if (!user) {
//     return next(new ErrorResponse(404, 'User not found'));
//   }

//   // Check password (replace with your password hashing logic)
//   if (user.password !== password) {
//     return next(new ErrorResponse(401, 'Incorrect password'));
//   }

//   res.status(200).json({ message: 'Login successful' });
// });

// module.exports = { login };
