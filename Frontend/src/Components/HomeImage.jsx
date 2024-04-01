import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  'https://mercury.akamaized.net/i/14d7051747719e750e87e510836e2e8d_232035_0.jpg',
  'https://mercury.akamaized.net/i/bd2e3e7cab6a3cf31f62f3b7a3bdd2b6_201575_0.jpg',
  'https://mercury.akamaized.net/i/ff7e5293d03ac84295b3fee75bc29528_240809_0.png',
  'https://mercury.akamaized.net/i/9efab1e5df1bb31fb2879a6f10b0bdea_232025_0.jpg',
  'https://mercury.akamaized.net/i/0f4ea3e016ba5c9a2cd9a649a70d1926_232402_0.jpg',
];

function HomeImage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative mb-10 lg:mb-20">
      <div className="relative h-60vh sm:h-70vh md:h-80vh lg:h-90vh">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-[30vw] object-cover"
        />
        {/* <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-gray-900 max-w-lg mx-auto">
              MEDIMART
            </h1>
            <Link to="/shop">
              <button className="mt-4 bg-black text-white rounded-md py-1 px-4 sm:py-2 sm:px-8 lg:py-3 lg:px-12">
                Shop Now
              </button>
            </Link>
          </div>
        </div> */}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-2 sm:left-4 md:left-6 lg:left-8">
        <button
          className="bg-black text-white rounded-full p-2 sm:p-3 md:p-4 lg:p-5 opacity-50 hover:opacity-100 transition-opacity"
          onClick={handlePrevClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 sm:h-4 md:h-4 lg:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-2 sm:right-4 md:right-6 lg:right-8">
        <button
          className="bg-black text-white rounded-full p-2 sm:p-3 md:p-4 lg:p-5 opacity-50 hover:opacity-100 transition-opacity"
          onClick={handleNextClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 sm:h-4 md:h-4 lg:h-6"
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
}

export default HomeImage;
