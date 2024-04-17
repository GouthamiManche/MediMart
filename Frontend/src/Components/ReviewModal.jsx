import React, { useState } from 'react';
const ReviewModal = ({  onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, review });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 mr-[1rem]">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="rating">
              Rating
            </label>
            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`text-2xl cursor-pointer ${rating >= value ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setRating(value)}
                >
                  &#9733; 
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="review">
              Review
            </label>
            <textarea
              className="border border-gray-400 rounded-md p-2 w-full"
              id="review"
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#125872] text-white font-bold py-2 px-4 rounded"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;