import React from 'react';

export default function OurProductCard({ imageSrc, }) {
  return (
   
    <div className="w-[18rem] overflow-hidden shadow-lg mt-[4rem] transition-transform duration-300 transform hover:scale-105 rounded-tl rounded-tr rounded-bl rounded-br  ">
      <img
        className="w-full h-full object-cover rounded-tl rounded-tr rounded-bl rounded-br"
        src={imageSrc}
        alt="Product"
       
      />
    </div>
    
    
  );
}
