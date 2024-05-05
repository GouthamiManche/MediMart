const express = require('express');
const mongoose = require('mongoose');

const Schema = require('./models/user.model')
const data = require('./models/product.model')
require('dotenv').config()

const cors = require('cors');
const { getAllUsers } = require('./APIS/Users');
const { getData } = require('./APIS/Data');
const { registerUser, loginUser } = require('./APIS/Login');
const {getProductsByCategory } = require('./APIS/ByCategory');
//const { CreateOrder } = require('./APIS/CreateOrder');

const app = express();

const URI = process.env.MONGO_URL
mongoose.connect(URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());
app.use(cors());

//ROUTES
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

// app.post('/api/createorder', CreateOrder);

app.get('/api/users', getAllUsers);
app.get('/api/data', getData);
app.get('/api/products',getProductsByCategory);

app.get('/', (req, res) => {
  res.json('Hello, this is your Express API!');
});

app.listen();
