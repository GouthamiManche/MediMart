const express = require('express');
const mongoose = require('mongoose');
const Schema = require('./models/user.model')
const data =require('./models/product.model')
require('dotenv').config()
const cors = require('cors'); 
const { getAllUsers } = require('./APIS/Users'); 
const { checkAccess, getCombinedData, getMedicineData, getOtherData} = require('./APIS/Data');
const cart = require('./models/cart.model')
const { registerUser, loginUser } = require('./APIS/Login');
const { getCapsule ,getTablet,getInjection, getSoap, getLotion, getSyrup, getDrops, getShampoo, getCream} = require('./APIS/ByCategory');
const { BabyCare, WomenCare, Protein, Supplements, SkinCare, HealthDevices, PersonalCare } = require('./APIS/ByCategory');
const cartSchema = require('./models/cart.model');
const { getItem } = require('./cartroute');
// const { logoutUser } = require('./APIS/Login');
const app = express();
const PORT = 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json());
app.use(cors());

//ROUTES
app.post('/api/cart',getItem);

app.post('/api/register', registerUser);
app.post('/api/login', loginUser); 
app.get('/api/users', getAllUsers);

app.get('/api/combined', checkAccess, getCombinedData);
app.get('/api/medicine', checkAccess, getMedicineData);
app.get('/api/cat', checkAccess, getOtherData);

app.get('/categories/baby-care', BabyCare);
app.get('/categories/women-care', WomenCare);
app.get('/categories/protein', Protein);
app.get('/categories/supplements', Supplements);
app.get('/categories/skin-care', SkinCare);
app.get('/categories/health-devices', HealthDevices);
app.get('/categories/personal-care', PersonalCare);

app.get('medicine/capsule',getCapsule)
app.get('medicine/tablet',getTablet)
app.get('medicine/injection',getInjection)
app.get('medicine/soap',getSoap)
app.get('medicine/lotion',getLotion)
app.get('medicine/syrup',getSyrup)
app.get('medicine/drops',getDrops)
app.get('medicine/shampoo',getShampoo)
app.get('medicine/cream',getCream)


app.get('/', (req, res) => {
    res.send('Hello, this is your Express API!');
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


