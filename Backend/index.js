const express = require('express');
const mongoose = require('mongoose');
const Schema = require('./models/user.model')
const data = require('./models/product.model')
require('dotenv').config()
const cors = require('cors');
const { getAllUsers } = require('./APIS/Users');
const { checkAccess, getData } = require('./APIS/Data');
const cart = require('./models/cart.model')
const { registerUser, loginUser } = require('./APIS/Login');
const { getProducts } = require('./APIS/ByCategory');
const cartSchema = require('./models/cart.model');
const app = express();
const PORT = 4000;
//const transporter = require('./APIS/email');
const nodemailer = require('nodemailer');

const URI = `mongodb+srv://mancheg19:0Pq7ouruMJz2Q9o1@cluster0.e8cib3z.mongodb.net/`
// Connect to MongoDB
mongoose.connect(URI, {
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());
app.use(cors());

//ROUTES
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.get('/api/users', getAllUsers);
app.get('/api/data', checkAccess, getData);


app.get('/api/products', async (req, res) => {
  try {
    await getProducts(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.json('Hello, this is your Express API!');
});


app.listen();
