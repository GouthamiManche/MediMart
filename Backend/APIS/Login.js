const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Create a new user instance
    const newUser = new User({ username, email, password });

    // Save the new user to the database
    await newUser.save();

    // Return success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    // If an error occurs during registration, return 500 status with an error message
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser };


const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
  };
  const token = jwt.sign(payload, "SecretKey", { expiresIn: '1hr' }); // Fix the syntax error here
  return token;
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = generateToken(user);
    const decodedToken = jwt.decode(token);
    const expiresIn = decodedToken.exp - Math.floor(Date.now() / 1000);
    // Store the token in client-side localStorage
    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email },
      token,
      expiresIn,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser };