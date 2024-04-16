const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model defined

const checkJwtToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')[1]; // Split by space and get the token part
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(403).json({ error: 'Invalid JWT token' });
      }
      try {
        // Look up the user in the database using the decoded user ID from the token
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        // Attach the user object to the request for further middleware/routes to use
        req.user = user;
        next();
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
      }
    });
  } else {
    return res.status(403).json({ error: 'Invalid JWT token' });
  }
};

module.exports = checkJwtToken;
