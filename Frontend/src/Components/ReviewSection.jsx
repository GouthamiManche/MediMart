import React, { useState } from 'react';
import ReviewModal from './ReviewModal';
import ReviewStars from './ReviewStars';
import { PiPencilLine } from "react-icons/pi";
const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

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

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
        <div className='flex justify-between'>
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="mt-4 mr-[2rem]">
        <button
          className="flex item-center justif-center bg-white border border-blue-400 text-blue-400 font-bold py-2 px-4 rounded "
          onClick={handleReviewClick}
        >
          <PiPencilLine className='mr-2 text-xl'/> Write a Review
        </button>
      </div>
      </div>
      <div className="flex items-center text-2xl mb-[2rem] mr-4">
              <span className="font-semibold text-4xl  mr-2">
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
      <div className="flex">
        <div className="w-[30%] pr-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-10 flex items-center mr-2">
                <span className="text-2xl">{5 - index}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
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
        <div className="w-1/2 pl-4">
          <div className="flex items-center mb-4">
            
            <span className="text-gray-500">{reviews.length} Reviews</span>
          </div>
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet.</p>
            ) : (
              reviews.map((review, index) => (
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