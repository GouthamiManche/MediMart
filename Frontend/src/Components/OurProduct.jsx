import React from 'react';
import OurProductCard from './OurProductCard';

export default function OurProduct() {
  return (
    <div className="m-4 md:m-8 lg:m-[5vw] text-center font-bold">
      <h1 className='text-2xl md:text-3xl lg:mb-[4rem] lg:text-[3vw]'>Product Categories</h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 mt-8">
        <OurProductCard imageSrc="/src/Images/Tablets.jpeg" title="Tablets" />
        <OurProductCard imageSrc="/src/Images/Cream.jpeg" title="Creams" />
        <OurProductCard imageSrc="/src/Images/syrup.jpg" title="Syrups" />
        <OurProductCard imageSrc="/src/Images/Injections.jpg" title="Injections" />
        <OurProductCard imageSrc="/src/Images/Capsule.jpg" title="Capsules" />
        <OurProductCard imageSrc="/src/Images/droper.jpg" title="Drops" />
        <OurProductCard imageSrc="/src/Images/lotion.jpg" title="Lotions" />
        <OurProductCard imageSrc="/src/Images/soap.jpg" title="Soaps" />
        <OurProductCard imageSrc="/src/Images/shampoo.jpg" title="Shampoos" />
      
      </div>
      <p className="pt-8 md:pt-12 lg:pt-[4rem] text-xl md:text-2xl lg:text-3xl">And Many More ...</p>
    </div>
  );
}