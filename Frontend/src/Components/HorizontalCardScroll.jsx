import React, { useRef } from "react";
import ItemForHorizontalScroll from "./ItemForHorizontalScroll";

const HorizontalCardScroll = ({ itemForHorizontalScroll }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -550,
        behavior: "smooth"
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 550,
        behavior: "smooth"
      });
    }
  };

  return (
    <div>
     <p className='text-gray-700 text-lg md:text-3xl font-bold ml-[1rem] mb-[2rem]'>Our Products</p>
      <div className="relative bg-blue-50">
        <div className="flex overflow-x-auto space-x-4 p-4" ref={scrollRef}>
          {itemForHorizontalScroll.map((item, index) => (
            <ItemForHorizontalScroll key={index} ItemForHorizontalScroll={item} />
          ))}
        </div>
        
     
        <button
          className="hidden md:block absolute top-1/2 left-4 -translate-y-1/2 bg-blue-500 p-2 rounded-full "
          onClick={scrollLeft}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>


        <button
          className="hidden md:block absolute top-1/2 right-4 -translate-y-1/2 bg-blue-500 p-2 rounded-full "
          onClick={scrollRight}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
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

export default HorizontalCardScroll;
