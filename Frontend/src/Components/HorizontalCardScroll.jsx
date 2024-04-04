import React, { useRef } from "react";
import Item from "./Item";

const HorizontalCardScroll = ({ items }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: "smooth"
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative">
      <div className="flex overflow-x-auto space-x-4 p-4" ref={scrollRef}>
        {items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-300"
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
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-300"
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
  );
};

export default HorizontalCardScroll;
