import React, { useRef } from "react";
import Item from "./Item";

const HorizontalCardScroll = ({ items }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -500,
        behavior: "smooth"
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 500,
        behavior: "smooth"
      });
    }
  };

  return (<> <p className='text-gray-700 text-lg md:ml-[2rem] md:text-3xl md:mt-[2rem] md:mb-[2rem] font-bold'>Our Products</p>
    <div className="relative bg-blue-100">
           <div className="flex overflow-x-auto space-x-4 p-4" ref={scrollRef}>
        {items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
      {/* Show left arrow button */}
      <button
        className="hidden md:block absolute top-1/2 left-4 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-300"
        onClick={scrollLeft}
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
      {/* Show right arrow button */}
      <button
        className="hidden md:block absolute top-1/2 right-4 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-300"
        onClick={scrollRight}
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
    </>
  );
};

export default HorizontalCardScroll;
