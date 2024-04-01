const express = require('express');
const mongoose = require('mongoose');
const Schema = require('./models/user.model')
const data =require('./models/data.model')
require('dotenv').config()
const cors = require('cors'); 
const { getAllUsers } = require('./APIS/Users'); 
const { checkAccess, getAllData, getAllDataCategory, getCombinedData} = require('./APIS/Data');
const cart = require('./models/cart.model')
const { registerUser, loginUser } = require('./APIS/Login');
const { getDataByCategory,getCapsule ,getTablet,getInjection, getSoap, getLotion, getSyrup, getDrops, getShampoo, getCream} = require('./APIS/ByCategory');
const { getCategory, BabyCare, WomenCare, Protein, Supplements, SkinCare, HealthDevices, PersonalCare } = require('./APIS/ByCategory');
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
app.post('/api/register', registerUser);
app.post('/api/login', loginUser); 
app.get('/api/users', getAllUsers);
app.get('/api/combined', checkAccess, getCombinedData);
app.get('/api/data', checkAccess, getAllData);
app.get('/api/datacat', checkAccess, getAllDataCategory);
app.get('/categories', getCategory);
app.get('/categories/baby-care', BabyCare);
app.get('/categories/women-care', WomenCare);
app.get('/categories/protein', Protein);
app.get('/categories/supplements', Supplements);
app.get('/categories/skin-care', SkinCare);
app.get('/categories/health-devices', HealthDevices);
app.get('/categories/personal-care', PersonalCare);
app.get('/api/medicine/capsule',getCapsule)
app.get('/api/medicine/tablet',getTablet)
app.get('/api/medicine/injection',getInjection)
app.get('/api/medicine/soap',getSoap)
app.get('/api/medicine/lotion',getLotion)
app.get('/api/medicine/syrup',getSyrup)
app.get('/api/medicine/drops',getDrops)
app.get('/api/medicine/shampoo',getShampoo)
app.get('/api/medicine/cream',getCream)


app.get('/', (req, res) => {
    res.send('Hello, this is your Express API!');
  });
  
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});