require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { getAllUsers } = require('./APIS/Users');
const { getData, addProduct, updateProduct, deleteProduct } = require('./APIS/Data');
const { registerUser, loginUser,verifyEmail } = require('./APIS/Login');
const { getProductsByCategory } = require('./APIS/ByCategory');
const {getOrderDetailsByEmail} = require('./APIS/OrderDetailsByEmail')
const {CreateOrder} = require("./APIS/CreateOrder")
const { addToCart, updateCartItem, deleteCartItem,deleteAllCartItems } = require('./APIS/Addtocart');
const { getCartItemsByEmail } = require('./APIS/GetCartItems');
const { getOrderDetailsByOrderId ,getAllOrders, deleteOrder} = require('./APIS/OrderDetailsbyID');
const { ValidateOrder } = require('./APIS/OrderValidate');
const { saveOrUpdateProfile, getProfileByEmail } = require('./APIS/Profile');
const { forgotPassword } = require('./APIS/ForgetPassword');
const { resetPassword } = require('./APIS/PasswordReset');
const { addAddress, getAddresses, editAddress, deleteAddress } = require('./APIS/Address');
const { getBanner, updateBanner, deleteBanner ,addBanner} = require('./APIS/Banner');
const { saveReview, getReviews } = require('./APIS/Review');

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

//cart
app.post('/api/addtocart', addToCart);
app.put('/api/updatecart/:id', updateCartItem);
app.delete('/api/deleteallcartitems',deleteAllCartItems);
app.delete('/api/removefromcart/:id', deleteCartItem);
app.get('/api/getcartitems',getCartItemsByEmail);

//address
app.put('/api/user/address/:id', editAddress);
app.post('/api/user/add-address', addAddress);
app.delete('/api/user/address/:id', deleteAddress);
app.get('/api/user/addresses',getAddresses);

//product
app.post('/api/addproduct', addProduct);
app.put('/api/updateproduct/:Product_id', updateProduct);
app.delete('/api/deleteproduct/:Product_id', deleteProduct);
app.get('/api/products', getProductsByCategory);

//login register
app.post('/api/register', registerUser);
app.post('/api/login', loginUser);
app.post('/api/verify-email', verifyEmail);
app.post('/api/forgot-password',forgotPassword);
app.post('/api/reset-password/:token',resetPassword);

//data
app.get('/api/data', getData);

//createorder and payment validate
app.post('/api/createorder', CreateOrder);
app.post("/api/order/validate",ValidateOrder);

//user
app.post('/api/profile',saveOrUpdateProfile)
app.get('/api/users', getAllUsers);
app.get('/api/profile/:email', getProfileByEmail);

//order history
app.get('/api/getorderdetails/:orderId',getOrderDetailsByOrderId);

//orderss
app.delete('/api/deleteorder/:id',deleteOrder);
app.get('/api/orders', getAllOrders);
app.get('/api/orders/:email', getOrderDetailsByEmail);

//banner
app.post('/api/addbanners', addBanner);
app.delete('/api/deletebanners/:id', deleteBanner);
app.get('/api/bannerPhotos',getBanner);
app.put('/api/updatebanner/:id',updateBanner)

app.get('/', (req, res) => {
  res.json('Hello, Backend Readyyyy!!! ');
});

//review
app.post('/api/savereviews',saveReview);
app.get('/api/getreviews', getReviews);

// app.listen();

const PORT = 4000; // Specify the desired local port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
