import React from 'react';

export default function OurProductCard({ imageSrc, title }) {
  return (
    <div className="w-full  md:w-[20%] lg:w-[22%] mt-[2vh] transition-transform duration-300 transform hover:scale-105 ">
      <img
        className="w-full h-56 md:h-[18rem] md:w-[16rem] object-contain lg:object-cover md:object-cover rounded-2xl  "
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
