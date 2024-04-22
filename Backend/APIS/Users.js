const User = require('../models/user.model');

async function getAllUsers(req, res) {
    try {
        const data = await User.find();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = { getAllUsers };