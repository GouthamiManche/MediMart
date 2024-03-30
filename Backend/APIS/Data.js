const { verifyToken } = require('../Auth/tokenauth');
const { checkApiKey } = require('../Auth/apikeyauth');
const Data = require('../models/data.model');

const checkAccess = async (req, res, next) => {
  const { apikey, authorization } = req.headers;

  if (checkApiKey(apikey)) {
    next();
  } else if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.split(' ')[1]; // Splitting the token using split(' ')[1]
    try {
      const { user } = req;
      const data = await Data.find();
      res.status(200).json(data);
      // console.log(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  } else {
    return res.status(403).json({ error: 'Invalid API key or JWT token' });
  }


  module.exports = { checkAccess, getAllData};

