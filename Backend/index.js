const express = require('express');
const mongoose = require('mongoose');
const Schema = require('./models/user.model')

const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MediDB', {
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, this is your Express API!');
  });

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if username or email already exists
    const existingUser = await Schema.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    const newUser = new Schema({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//login endpoint 
app.post('/login', async (req, res) => {
    try {
      const { email , password } = req.body;
  
      // Check if user exists
      const user = await Schema.findOne({email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check password
      if (!password) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
