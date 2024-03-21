const express = require('express');
const mongoose = require('mongoose');
const Schema = require('./models/user.model')
const data =require('./models/data.model')
const cors = require('cors'); 
const { getAllUsers } = require('./controllers/Users'); 
const { getAllData } = require('./controllers/Data');

const { registerUser, loginUser } = require('./controllers/Login');
const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MediDB', {
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());
app.use(cors()); 

app.post('/api/register', registerUser);
app.post('/api/login', loginUser); 
app.get('/api/users', getAllUsers);
app.get('/api/data', getAllData);

app.get('/', (req, res) => {
    res.send('Hello, this is your Express API!');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
