// const User = require('../models/user.model');

// // Function to fetch all users
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = { getAllUsers };
// dataController.js file
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
