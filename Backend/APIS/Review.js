const Review = require('../models/review.model');
// Function to save a new review
const saveReview = async (req, res) => {
    try {
      const { product_name, reviewerName, review, reviewStar } = req.body;
      const newReview = new Review({
        Product_Name: product_name,
        Reviewer_Name: reviewerName,
        Review: review,
        Review_Star: reviewStar,
      });
      await newReview.save();
      res.status(201).json({ message: 'Review saved successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Function to fetch all reviews
  const getReviews = async (req, res) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Routes
 module.exports={saveReview,getReviews}