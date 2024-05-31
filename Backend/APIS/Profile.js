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

            // Format date of birth to ddmmyy
            const formattedDOB = formatDateOfBirth(dateOfBirth);
            user.dateOfBirth = formattedDOB;

            await user.save();
        } else {
            // If user doesn't exist, you might want to create a new user with these details
            user = new User({
                email,
                fullName,
                contactNumber,
                deliveryAddress,
                profilePic,
                gender,
                // Format date of birth to ddmmyy
                dateOfBirth: formatDateOfBirth(dateOfBirth),
            });
            await user.save();
        }
        res.status(200).json({ message: 'Profile saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving profile' });
    }
};

const formatDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth) return '';

    // Assuming dateOfBirth is a Date object or string in the format 'yyyy-mm-dd'
    const date = new Date(dateOfBirth);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}${month}${year}`;
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
            dateOfBirth: user.dateOfBirth,
        };

        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving profile' });
    }
};

module.exports = { saveOrUpdateProfile, getProfileByEmail };
