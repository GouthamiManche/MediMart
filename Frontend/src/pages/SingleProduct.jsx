import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ReviewStars from '../Components/ReviewStars';
import ReviewModal from '../Components/ReviewModal';

export default function SingleProduct() {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);

  if (!product) {
    return <div className="text-center text-gray-600">Product not found</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.Medicine_Name} to cart`);
  };

  const handleReviewClick = () => {
    setShowReviewModal(true);
  };

  const handleSubmitReview = (review) => {
    setReviews((prevReviews) => [...prevReviews, review]);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center md:block">
            <button
              className="bg-white rounded-full p-2 transition-colors duration-300 hover:bg-gray-200"
              onClick={handleBackClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 hover:text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <img
              src={product.Image_URL}
              alt={product.Medicine_Name}
              className="max-w-full h-auto mt-4 md:mt-0 rounded-md transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">{product.Medicine_Name}</h2>
              <div className="mb-4 bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Uses</h3>
                <p className="text-gray-600">{product.Uses}</p>
              </div>
              <div className="mb-4 bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Composition</h3>
                <p className="text-gray-600">{product.Composition}</p>
              </div>
              <div className="mb-4 bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Manufacturer</h3>
                <p className="text-gray-600">{product.Manufacturer}</p>
              </div>
              <div className="mb-4">
                <p className="text-3xl md:text-4xl text-blue-600 font-semibold">{`₹${product.Price}`}</p>
              </div>
              <div className="mb-4 bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Quantity</h3>
                <div className="flex mt-[1rem]">
                  <button
                    className="bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700 px-4 py-2 rounded transition-colors duration-300 focus:outline-none"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-8 text-center text-gray-700 ml-4"
                  />
                  <button
                    className="bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700 px-4 py-2 rounded transition-colors duration-300 focus:outline-none"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Reviews</h3>
              <div className="flex flex-wrap items-center justify-between mb-4">
                {reviews.map((review, index) => (
                  <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-2">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Review {index + 1}</div>
                      <ReviewStars rating={review.rating} />
                      <p className="text-gray-600 mt-2">{review.review}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  onClick={handleReviewClick}
                >
                  Write a Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showReviewModal && (
        <ReviewModal
          product={product}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
}