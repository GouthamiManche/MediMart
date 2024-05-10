import React, { useState } from 'react';
import ReviewModal from './ReviewModal';
import ReviewStars from './ReviewStars';
import { PiPencilLine } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
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
    <div className="bg-white p-6 rounded-md text-gray-700 shadow-md relative mt-[4rem] max-h-screen">
      <h2 className="text-5xl font-bold mb-4 ">Reviews</h2>
      <div className="mb-4 flex justify-end">
        <button
          className="flex item-center justify-center bg-[#125872] text-white font-bold py-2 px-4 rounded"
          onClick={handleReviewClick}
        >
          <PiPencilLine className='mr-2 text-xl'/> Write a Review
        </button>
      </div>
      <div className="flex items-center text-2xl mb-4">
        <span className="font-semibold text-4xl mr-2">
          {reviews.length > 0
            ? (
              reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            ).toFixed(1)
            : 0}
        </span>
        <ReviewStars
          rating={
            reviews.length > 0
              ? reviews.reduce((sum, review) => sum + review.rating, 0) /
                reviews.length
              : 0
          }
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-10 flex items-center mr-2">
                <span className="text-2xl">{5 - index} <span className='text-yellow-500 text-2xl'>&#9733; </span> </span>
              </div>
              <div className="w-[70%] bg-gray-200 rounded-full h-3">
                <div
                  className="bg-yellow-400 h-3 rounded-full"
                  style={{
                    width: `${
                      (ratingCounts[5 - index] || 0) / totalReviews * 100 || 0
                    }%`,
                  }}
                />
              </div>
              <span className="ml-2 text-gray-600">
                {((ratingCounts[5 - index] || 0) / totalReviews * 100 || 0).toFixed(
                  0
                )}
                %
              </span>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center mb-4">
            <span className="text-gray-500">{reviews.length} Reviews</span>
          </div>
          <div className="space-y-4">
            {currentReviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet.</p>
            ) : (
              currentReviews.map((review, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <ReviewStars rating={review.rating} />
                    <span className="text-gray-700 font-semibold ml-2">
                      Review {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.review}</p>
                </div>
              ))
            )}
          </div>
          <div className="mt-[5rem] flex justify-center items-end">
            {currentPage > 1 && (
              <button
                onClick={() => paginate(currentPage - 1)}
                className="px-3 py-1 mr-2  text-gray-500 rounded focus:outline-none"
              >
               <IoIosArrowBack className='text-2xl '/>
              </button>
            )}
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 mr-2 bg-transparent text-gray-500 rounded-full focus:outline-none ${currentPage === number ? 'text-[#125872] border border-[#125872]' : ''}`}
              >
                {number}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => paginate(currentPage + 1)}
                className="px-3 py-1  text-gray-500 rounded focus:outline-none"
              >
            <IoIosArrowForward className='text-2xl'/>
              </button>
            )}
          </div>
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
