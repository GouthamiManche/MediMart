import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const ReviewStars = ({ rating }) => {
  // Ensure the rating is a valid number between 0 and 5
  const validRating = typeof rating === 'number' && rating >= 0 && rating <= 5 ? rating : 0;

  const renderStars = () => {
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FaStarHalfAlt key="half" className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </div>
    );
  };

  return <div>{renderStars()}</div>;
};

export default ReviewStars;
