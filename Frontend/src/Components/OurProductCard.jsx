import React from 'react';

export default function OurProductCard({ imageSrc, title }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 mt-[2vh] transition-transform duration-300 transform hover:scale-105">
      <img
        className="w-full h-56 md:h-64 lg:h-[48vh] object-contain lg:object-cover md:object-cove rounded-tl rounded-tr rounded-bl rounded-br"
        src={imageSrc}
        alt="Product"
      />
      <div className="p-4">
        <h2 className="text-base md:text-lg lg:text-[2vw] font-semibold">
          {title}
        </h2>
      </div>
    </div>
  );
}