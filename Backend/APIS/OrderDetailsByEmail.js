const OrderDetail = require('../models/orderdetails.model');

const getOrderDetailsByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const orders = await OrderDetail.aggregate([
      { $match: { email: email } },
      {
        $addFields: {
          // Convert the orderDate string to a date object
          orderDateAsDate: {
            $dateFromString: {
              dateString: '$orderDate',
              format: '%d/%m/%Y' // Specify the format of the date string
            }
          }
        }
      },
      { $sort: { orderDateAsDate: -1 } } // Sort by the new date field in descending order
    ]);

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for the provided email" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching order details:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getOrderDetailsByEmail };