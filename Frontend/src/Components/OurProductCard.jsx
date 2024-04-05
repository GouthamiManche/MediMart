import React from 'react';

export default function OurProductCard({ imageSrc, title }) {
  return (
    <div className="w-full md:w-[20%] lg:w-[22%] mt-[2vh] transition-transform duration-300 transform hover:scale-105 ">
      <img
        className="w-full h-56 md:h-[18rem] md:w-[16rem] object-contain lg:object-cover md:object-cove rounded-tl rounded-tr rounded-bl rounded-br"
        src={imageSrc}
        alt="Product"
      />
      <div className="p-4">
        <h2 className="text-base md:text-[1.5vw]  font-semibold">
          {title}
        </h2>
      </div>
    </div>
  );
}
