import React, { useState } from 'react';

const MedicalPharmacyCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = window.innerWidth <= 768; 

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? quotes.length - 1 : currentSlide - 1);
  };

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide === quotes.length - 1 ? 0 : currentSlide + 1);
  };

  const quotes = [
    {
      text: 'The pharmacy staff is very knowledgeable and helpful. They always go above and beyond to assist me with my prescriptions.',
      author: '- Sarah M.',
    },
    {
      text: 'I love how convenient it is to refill my prescriptions online. The process is seamless and saves me a lot of time.',
      author: '- Michael R.',
    },
    {
      text: 'I am impressed by the professionalism and efficiency of the pharmacy staff. They make getting my medications a breeze.',
      author: '- Samantha W.'
    },
    {
      text: 'The convenience of ordering prescriptions online from this pharmacy has made my life so much easier. Thank you!',
      author: '- James T.'
    },
    {
      text: 'I appreciate the personalized service I receive every time I visit this pharmacy. They truly care about their customers.',
      author: '- Rebecca S.'
    }
  ];

  return (
    <div className="max-w-full mx-auto mt-8 px-5 mb-8 sm:px-18  sm:mt-10 sm:mb-10 ">
      <p className='text-gray-700 text-lg md:text-2xl font-bold'>Customer Testimonials</p>
      <div className="relative overflow-hidden mt-[1rem] md:mt-[2rem]">
        <div
          className="flex gap-8 h-56 w-[86rem] md:w-[110rem] transition-transform duration-500 ease-in-out sm:h-56"
          style={{ transform: `translateX(-${isMobile ? (currentSlide * (112 / quotes.length)) : (currentSlide * (38 / quotes.length))}%)` }}
        >
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="carousel-item flex flex-col  items-center justify-center p-4 rounded-lg  bg-blue-100  sm:p-6"
              style={{ flex: `0 0 calc(100% / ${quotes.length})` }}
            >
              <p className="text-base text-center md:text-[1.4vw]">{quote.text}</p>
              <p className="text-sm text-center mt-2">{quote.author}</p>
            </div>
          ))}
        </div>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20"
          onClick={handlePrevSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-20"
          onClick={handleNextSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MedicalPharmacyCarousel;
