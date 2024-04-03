const Cart = require("./models/cart.model");

//get cart items
const getItem = async (req,res)=>{

    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
     const userId = req.user._id;
    try {
        const { userId, items } = req.body;
        const newCart = new Cart({ userId, items });
        await newCart.save();

        res.status(201).json({ message: 'Cart details saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {getItem};
