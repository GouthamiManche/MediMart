const jwt = require('jsonwebtoken');

const verifyToken = (token, JWT_KEY) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) {
        reject('Invalid JWT token');
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = { verifyToken };
