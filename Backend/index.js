const express = require('express');
const mongoose = require('mongoose');
const Schema = require('./models/user.model');
const data = require('./models/product.model');
require('dotenv').config();
const cors = require('cors');
const { getAllUsers } = require('./APIS/Users');
const { getData } = require('./APIS/Data');
const { registerUser, loginUser } = require('./APIS/Login');
const { getProductsByCategory } = require('./APIS/ByCategory');
const {getOrderDetailsByEmail} = require('./APIS/OrderDetailsByEmail')
const {CreateOrder} = require("./APIS/CreateOrder")
const Razorpay = require('razorpay');

const app = express();
const URI = process.env.MONGO_URL;

// MongoDB connection
mongoose
  .connect(URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(cors());

// Razorpay Configuration
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// ROUTES
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

app.post('/api/createorder', CreateOrder);

app.get('/api/users', getAllUsers);
app.get('/api/data', getData);
app.get('/api/products', getProductsByCategory);
app.get('/api/orders/:email', getOrderDetailsByEmail);

// app.get('/api/user', (req, res) => {
//   res.json(userData);
// });

// app.put('/api/user', (req, res) => {
//   const { fullName, contactNumber, emailAddress, deliveryAddress } = req.body;

//   // Update user data
//   userData.fullName = fullName || userData.fullName;
//   userData.contactNumber = contactNumber || userData.contactNumber;
//   userData.emailAddress = emailAddress || userData.emailAddress;
//   userData.deliveryAddress = deliveryAddress || userData.deliveryAddress;

//   res.json(userData);
// });

// Endpoint to create a new payment order
// app.post('/api/create-order', async (req, res) => {
//   try {
//     const { amount, currency } = req.body;
//     const options = {
//       amount: amount * 100, // Amount in smallest currency unit (e.g., paise for INR)
//       currency,
//       receipt: `order_${Date.now()}`,
//       payment_capture: 1, // Auto-capture payment
//     };

//     const response = await razorpay.orders.create(options);
//     res.json(response);
//   } catch (error) {
//     console.error('Error creating Razorpay order:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

app.get('/', (req, res) => {
  res.json('Hello, this is your Express API!');
});

app.listen();

// const PORT = 4000; // Specify the desired local port

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
