const jwt = require('jsonwebtoken');
const checkJwtToken = (req, res, next) => {
    const { authorization } = req.headers;
  
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.split(' ')[1]; // Split by space and get the token part
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          console.error(err);
          return res.status(403).json({ error: 'Invalid JWT token' });
        }
        req.user = decoded;
        next();
      });
    } else {
      return res.status(403).json({ error: 'Invalid JWT token' });
    }
  };

  module.exports=checkJwtToken;