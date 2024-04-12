import React from 'react';
import OurProductCard from './OurProductCard';
import personalcare from '../assets/personalcare.jpg'
import skincare from '../assets/skincare.jpg'
import protein from '../assets/protein_supplements.jpg'
import healthandnutrition from '../assets/health_and_nutrition.jpg'
import womencare from '../assets/womencare.jpg'
import babycare from '../assets/babycare.jpg'
import healthdevices from '../assets/healthdevices.jpg'
import medicine from '../assets/medicines.jpg'

export default function OurProduct() {
  return (
    <div className="m-4 md:mx-[6rem]  text-center font-semibold md:pb-[4rem]">
      <h1 className='text-xl md:text-2xl lg:mb-[2rem] lg:text-[3vw] md:pt-[2rem]'>Product Categories</h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-4  mt-8">
        <OurProductCard imageSrc={personalcare} title="Personal Care" sub_category="personalcare"/>
        <OurProductCard imageSrc={skincare} title="Skin Care" sub_category="skincare" />
        <OurProductCard imageSrc={protein} title="Protein Powders" sub_category="protein"/>
        <OurProductCard imageSrc={healthandnutrition} title="Health Supplements"sub_category="supplements" />
        <OurProductCard imageSrc={womencare} title="Women Care" sub_category="womencare" />
        <OurProductCard imageSrc={babycare} title="Baby Care" sub_category="babycare"/>
        <OurProductCard imageSrc={healthdevices} title="Health Devices" sub_category="healthdevices" />
        <OurProductCard imageSrc={medicine} title="Medicine" />
      </div>
      {/* <p className="pt-8 md:pt-12 lg:pt-[4rem] text-xl md:text-2xl lg:text-3xl">And Many More ...</p> */}
    </div>
  );
}
