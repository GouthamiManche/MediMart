const orderDate = new Date().toLocaleDateString('en-GB');

const User = require('../models/user.model');

const saveOrUpdateProfile = async (req, res) => {
    const { email, fullName, contactNumber, deliveryAddress, profilePic, gender, dateOfBirth } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            user.fullName = fullName;
            user.contactNumber = contactNumber;
            user.deliveryAddress = deliveryAddress;
            user.profilePic = profilePic;
            user.gender = gender;
            user.dateOfBirth = new Date(dateOfBirth);
            await user.save();
        } else {
            // If user doesn't exist, create a new user
            user = new User({
                email,
                fullName,
                contactNumber,
                deliveryAddress,
                profilePic,
                gender,
                dateOfBirth: new Date(dateOfBirth)
            });
            await user.save();
        }
        res.status(200).json({ message: 'Profile saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving profile' });
    }
};
const getProfileByEmail = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const profile = {
            email: user.email,
            fullName: user.fullName,
            contactNumber: user.contactNumber,
            deliveryAddress: user.deliveryAddress,
            profilePic: user.profilePic,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth.toISOString().split('T')[0], // Return date in YYYY-MM-DD format
        };

        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving profile' });
    }
};

module.exports = { saveOrUpdateProfile, getProfileByEmail };
