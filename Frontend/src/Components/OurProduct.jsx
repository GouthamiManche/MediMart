import React from 'react';
import OurProductCard from './OurProductCard';

export default function OurProduct() {
  return (
    <div className="m-4 md:m-8 lg:m-[1px] text-center font-bold">
      <h1 className='text-2xl md:text-3xl lg:mb-[2rem] lg:text-[3vw]'>Product Categories</h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mt-8">
        <OurProductCard imageSrc="/src/Images/personalcare.jpg" title="Personal Care" />
        <OurProductCard imageSrc="/src/Images/skincare.jpg" title="Skin Care" />
        <OurProductCard imageSrc="/src/Images/protein_supplements.jpg" title="Protein Powders" />
        <OurProductCard imageSrc="/src/Images/health_and_nutrition.jpg" title="Health Supplements" />
        <OurProductCard imageSrc="/src/Images/womencare.jpg" title="Women Care" />
        <OurProductCard imageSrc="/src/Images/babycare.jpg" title="Baby Care" />    
      </div>
      {/* <p className="pt-8 md:pt-12 lg:pt-[4rem] text-xl md:text-2xl lg:text-3xl">And Many More ...</p> */}
    </div>
  );
}