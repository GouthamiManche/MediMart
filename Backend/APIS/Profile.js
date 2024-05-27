const Profile = require('../models/userprofile.model')
const saveOrUpdateProfile = async (req, res) => {
    const { email, fullName, contactNumber, deliveryAddress, profilePic } = req.body;

    try {
        let profile = await Profile.findOne({ email });

        if (profile) {
            profile.fullName = fullName;
            profile.contactNumber = contactNumber;
            profile.deliveryAddress = deliveryAddress;
            profile.profilePic = profilePic;
            await profile.save();
        } else {
            profile = new Profile({
                email,
                fullName,
                contactNumber,
                deliveryAddress,
                profilePic,
            });
            await profile.save();
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
        const profile = await Profile.findOne({ email });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving profile' });
    }
};

module.exports={getProfileByEmail,saveOrUpdateProfile}