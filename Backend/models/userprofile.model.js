const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    email: String,
    fullName: String,
    contactNumber: String,
    deliveryAddress: String,
    profilePic: String,
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
