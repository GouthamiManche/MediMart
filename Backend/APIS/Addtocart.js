const CartItem = require('../models/addtocart.model');

async function addToCart(req, res) {
    const { Name, Price, Image_URL, quantity, Product_id, email } = req.body;

    try {
        // Check if the product is in stock
        const product = await Data.findOne({ Product_id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.Stock !== 'In Stock') {
            return res.status(400).json({ message: 'Item is out of stock' });
        }

        // Add item to cart
        const newItem = new CartItem({
            Name,
            Price,
            Image_URL,
            quantity,
            Product_id,
            email
        });

        await newItem.save();

        res.status(201).json({ message: 'Item added to cart successfully', item: newItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
}

async function updateCartItem(req, res) {
    const productId = req.params.id;
    const { quantity } = req.body;

    try {
        const updatedItem = await CartItem.findOneAndUpdate({ Product_id: productId }, { quantity }, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        res.json({ message: 'Item quantity updated', item: updatedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update item quantity' });
    }
}

async function deleteCartItem(req, res) {
    const productId = req.params.id;

    try {
        const deletedItem = await CartItem.findOneAndDelete({ Product_id: productId });

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        res.json({ message: 'Item removed from cart', item: deletedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to remove item from cart' });
    }
}

async function deleteAllCartItems(req, res) {
    const userEmail = req.body.email; // Assuming you're passing the user's email in the request body

    try {
        const deletedItems = await CartItem.deleteMany({ email: userEmail });

        res.json({ message: 'All cart items deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete cart items' });
    }
}

module.exports = {
    addToCart,
    updateCartItem,
    deleteCartItem,
    deleteAllCartItems,
};
