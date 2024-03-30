import React from 'react';

export default function OurProductCard({ imageSrc, title}) {
  return (

    <div className="w-full sm:w-1/3 overflow-hidden shadow-lg mt-[4rem] transition-transform duration-300 transform hover:scale-105 rounded-tl rounded-tr rounded-bl rounded-br  ">
      <div className="h-56 sm:h-auto sm:w-full sm:flex-none">
        <img
          className="w-full h-full object-cover"
          src={imageSrc}
          alt="Product"
        />
      </div>
      <div className="flex flex-col justify-evenly p-5 bg-white">
        <h3 className="text-xl text-gray-900 font-bold">{title}</h3>
      </div>
    </div>


  );
}
