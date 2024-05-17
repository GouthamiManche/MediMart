const express = require('express');
const mongoose = require('mongoose');
const Schema = require('./models/user.model');
const data = require('./models/product.model');
require('dotenv').config();
const cors = require('cors');
const crypto = require("crypto");
const { getAllUsers } = require('./APIS/Users');
const { getData } = require('./APIS/Data');
const { registerUser, loginUser } = require('./APIS/Login');
const { getProductsByCategory } = require('./APIS/ByCategory');
const {getOrderDetailsByEmail} = require('./APIS/OrderDetailsByEmail')
const {CreateOrder} = require("./APIS/CreateOrder")
const { addToCart, updateCartItem, deleteCartItem } = require('./APIS/Addtocart');
const { getCartItemsByEmail } = require('./APIS/GetCartItems');
const Razorpay = require("razorpay");

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
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.post('/api/createorder', CreateOrder);

app.post('/api/addtocart', addToCart);
app.put('/api/updatecart/:id', updateCartItem);
app.delete('/api/removefromcart/:id', deleteCartItem);

app.get('/api/users', getAllUsers);
app.get('/api/data', getData);
app.get('/api/products', getProductsByCategory);
app.get('/api/orders/:email', getOrderDetailsByEmail);
app.get('/api/getcartitems',getCartItemsByEmail);


app.get('/', (req, res) => {
  res.json('Hello, this is your Express API!');
});

app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});
// app.listen();

const PORT = 4000; // Specify the desired local port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
