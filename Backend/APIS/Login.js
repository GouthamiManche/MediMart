
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const generateToken = (user) => {

    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(payload,process.env.JWT_KEY, { expiresIn: '1h' });
    return token;
  };

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    // req.session.userId = user._id;
    const token = generateToken(user._id);
    res.status(200).json({
        message: 'Login successful',
        user: { id: user._id, username: user.username, email: user.email },
        token,
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// const logoutUser = async(req,res)=>{
//   try{
//     if (req.session.userId) {
//       req.session.destroy(err => {
//         if (err) {
//           res.status(500).json({ error: 'Logout failed' });
//         } else {
//           res.json({ message: 'Logout successful' });
//         }
//       });
//     } else {
//       res.status(401).json({ error: 'You are not logged in' });
//     }
//   }
//   catch(error){
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

module.exports = { registerUser, loginUser};
