import React, { useState } from 'react';
import ReviewModal from './ReviewModal';
import ReviewStars from './ReviewStars';
import { PiPencilLine } from "react-icons/pi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const handleSubmitReview = (review) => {
    setReviews((prevReviews) => [...prevReviews, review]);
    setShowReviewModal(false);
  };

  const handleReviewClick = () => {
    setShowReviewModal(true);
  };

  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  const totalReviews = reviews.length;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const maxVisiblePages = 4;
  const pageNumbers = [];
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto my-8">
      <div className=" py-8 px-4 rounded-md">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">Customer Reviews</h2>
        <div className="flex justify-center mb-4">
          <ReviewStars
            rating={
              reviews.length > 0
                ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
                : 0
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="w-10 flex items-center mr-2 text-gray-800">
                  <span className="text-xl">{5 - index}</span>
                  <span className="text-yellow-500 text-2xl ml-1">&#9733;</span>
                </div>
                <div className="w-[70%] bg-gray-300 rounded-full h-3">
                  <div
                    className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${(ratingCounts[5 - index] || 0) / totalReviews * 100 || 0}%`,
                    }}
                  />
                </div>
                <span className="ml-2 text-gray-600">
                  {((ratingCounts[5 - index] || 0) / totalReviews * 100 || 0).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center mb-4">
              <span className="text-gray-800 font-semibold">{reviews.length} Reviews</span>
            </div>
            <div className="space-y-4">
  {currentReviews.length === 0 ? (
    <p className="text-gray-600 text-center">No reviews yet.</p>
  ) : (
    currentReviews.map((review, index) => (
      <div key={index} className="flex items-center my-2 pb-2 border-b border-gray-300">
        <ReviewStars rating={review.rating} />
        <span className="text-gray-800 font-semibold ml-2">
          Review {index + 1}
        </span>
        <p className="text-gray-700 ml-4">{review.review}</p>
      </div>
    ))
  )}
</div>
            <div className="mt-[5rem] flex justify-center items-end">
              {currentPage > 1 && (
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className="px-3 py-1 mr-2 text-gray-600 rounded focus:outline-none transition-colors duration-300 hover:text-gray-800"
                >
                  <IoIosArrowBack className="text-2xl" />
                </button>
              )}
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 mr-2 bg-transparent text-gray-600 rounded-full focus:outline-none transition-colors duration-300 hover:text-gray-800 ${currentPage === number ? 'text-[#125872] border border-[#125872]' : ''
                    }`}
                >
                  {number}
                </button>
              ))}
              {currentPage < totalPages && (
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className="px-3 py-1 text-gray-600 rounded focus:outline-none transition-colors duration-300 hover:text-gray-800"
                >
                  <IoIosArrowForward className="text-2xl" />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="flex items-center justify-center bg-[#125872] text-white font-bold py-2 px-4 rounded transition-colors duration-300 hover:bg-[#0e445a]"
            onClick={handleReviewClick}
          >
            <PiPencilLine className="mr-2 text-xl" /> Write a Review
          </button>
        </div>
      </div>
      {showReviewModal && (
        <ReviewModal
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleSubmitReview}
        />
      )}
    </div>
  );
};

export default ReviewSection;