app.post('/api/cart/add', async (req, res) => {
    try {
      const { medicinename, quantity } = req.body;
      const medicine = await Data.findByName(medicineId);
      if (!medicine) {
        return res.status(404).json({ error: 'Medicine not found' });
      }
      // Add logic to add the medicine to the user's cart
      res.json({ message: 'Medicine added to cart successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });