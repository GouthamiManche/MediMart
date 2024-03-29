const jwt = require('jsonwebtoken');
const Data = require('../models/data.model');

const checkAccess = (req, res, next) => {
    const { apikey, authorization } = req.headers;
      
    if (apikey === "123") {
      next();
    } else if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7);
      jwt.verify(token,process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid JWT token' });
        } else {
          req.user = decoded;
          next(); 
        }
      });
    } else {
      return res.status(403).json({ error: 'Invalid API key or JWT token' });
    }
  };
  
  async function getAllData(req, res) {
    try {
      const { user } = req;
      const data = await Data.find();
      res.status(200).json(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }
  
  
  module.exports = { checkAccess, getAllData};
  