const checkApiKey = (req, res, next) => {
    const { apikey } = req.headers;
  
    if (apikey === process.env.APIKEY) {
      next();
    } else {
      return res.status(403).json({ error: 'Invalid API key' });
    }
  };

module.exports=checkApiKey;
