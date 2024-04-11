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

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
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

// app.post('/send-email', async (req, res) => {
//   const { to, subject, text } = req.body;

//   try {
//       await transporter.sendMail({
//           from: 'manchegouthami@gmail.com',
//           to,
//           subject,
//           text
//       });
//       res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ error: 'Error sending email' });
//   }
// });

app.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  // Send password reset email
  try {
    await sendPasswordResetEmail(email);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

async function sendPasswordResetEmail(email) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'mancheg19@gmail.com',
      pass: 'imtm osnj hrde dmsi',
    },
  });

  const info = await transporter.sendMail({
    from: 'Gouthamiii',
    to: email,
    subject: 'Password Reset Request',
    text: 'Click the link to reset your password: https://yourwebsite.com/reset-password',
    //html: '<p>Click the link to reset your password: <a href="https://yourwebsite.com/reset-password">Reset Password</a></p>',
  });

  console.log('Message sent: %s', info.messageId);
}
// app.post('/api/cart', async (req, res) => {
//   try {
//     const { productId, quantity, userId } = req.body;

//     // Fetch the product details
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     // Create a new cart item
//     const cartItem = new CartItem({
//       product: {
//         name: product.name,
//         image: product.image,
//         price: product.price,
//       },
//       quantity,
//       user: userId,
//     });

//     await cartItem.save();

//     res.status(201).json(cartItem);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get('/', (req, res) => {
  res.send('Hello, this is your Express API!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


