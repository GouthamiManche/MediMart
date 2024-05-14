const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

// Function to generate a unique customerId
const generateCustomerId = () => {
  return uuid.v4(); // Generate a random UUID
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
    console.log('Hashed Password:', hashedPassword);

    // Create a new user instance with hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      // Generate a unique customerId
      customerId: generateCustomerId(),
    });

    console.log('New User Object:', newUser); // Check if password is hashed in newUser object

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

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.Secret_Key, { expiresIn: '3hr' }); 
  return token;
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Password is correct, generate JWT token
    const token = generateToken(user);
    const decodedToken = jwt.decode(token);
    const expiresIn = decodedToken.exp - Math.floor(Date.now() / 1000);

    // Send the token along with user details
    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email },
      token,
      expiresIn,
      customerId: user.customerId,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerUser, loginUser };