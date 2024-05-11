const CartItem = require('../models/addtocart.model');

async function getCartItemsByEmail(req, res) {
    try {
        const { email } = req.query; // assuming you pass user's email as a query parameter
        const cartItems = await CartItem.find({ email });
        res.json(cartItems);
    } catch (error) {
        console.error("Error fetching cart items:", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getCartItemsByEmail
};
