
// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {

//   const { authorization } = req.headers;
//   if (authorization && authorization.startsWith('Bearer ')) {
//     const token = authorization.split(' ')[1];
//     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
//       if (err) {
//         return res.status(403).json({ error: 'Invalid JWT token or token expired' });
//       } else {
//         req.user = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.status(403).json({ error: 'Invalid JWT token' });
//   }
// };

// module.exports = verifyToken ;
