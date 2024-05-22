const express = require('express');
const mongoose = require('mongoose');
const Schema = require('./models/user.model');
const Data = require('./models/product.model');
const OrderDetail= require('./models/orderdetails.model')
require('dotenv').config();
const cors = require('cors');
const crypto = require("crypto");
const { getAllUsers } = require('./APIS/Users');
const { getData } = require('./APIS/Data');
const { registerUser, loginUser } = require('./APIS/Login');
const { getProductsByCategory } = require('./APIS/ByCategory');
const {getOrderDetailsByEmail} = require('./APIS/OrderDetailsByEmail')
const {CreateOrder} = require("./APIS/CreateOrder")
const { addToCart, updateCartItem, deleteCartItem,deleteAllCartItems } = require('./APIS/Addtocart');
const { getCartItemsByEmail } = require('./APIS/GetCartItems');
const Razorpay = require("razorpay");
const { getOrderDetailsByOrderId ,getAllOrders} = require('./APIS/OrderDetailsbyID');
const { ValidateOrder } = require('./APIS/OrderValidate');

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
app.use(express.urlencoded({ extended: false }));


// ROUTES
app.put('/api/updatecart/:id', updateCartItem);

app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.post('/api/createorder', CreateOrder);
app.post("/api/order/validate",ValidateOrder);
app.post('/api/addtocart', addToCart);

app.delete('/api/deleteallcartitems',deleteAllCartItems);
app.delete('/api/removefromcart/:id', deleteCartItem);

app.get('/api/users', getAllUsers);
app.get('/api/data', getData);
app.get('/api/products', getProductsByCategory);
app.get('/api/orders/:email', getOrderDetailsByEmail);
app.get('/api/getcartitems',getCartItemsByEmail);
app.get('/api/getorderdetails/:orderId',getOrderDetailsByOrderId);
app.get('/api/orders', getAllOrders);

app.get('/', (req, res) => {
  res.json('Hello, Backend Readyyyy!!! ');
});

app.post('/addproduct', async (req, res) => {
  const newProduct = new Data({
      Product_id: req.body.Product_id,
      Category: req.body.Category,
      Sub_Category: req.body.Sub_Category,
      Name: req.body.Name,
      Composition: req.body.Composition,
      Uses: req.body.Uses,
      Side_effects: req.body.Side_effects,
      Image_URL: req.body.Image_URL,
      Manufacturer: req.body.Manufacturer,
      Price: req.body.Price,
      Return_Policy: req.body.Return_Policy,
      Directions_for_Use: req.body.Directions_for_Use
  });

  try {
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

app.listen();

// const PORT = 4000; // Specify the desired local port

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
