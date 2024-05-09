import { OurProductCard } from "./OurProductCard";
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
    <div className="m-4 md:mx-6rem text-center font-semibold md:pb-4rem  text-gray-700">
      <h1 className="text-xl md:text-4xl lg:mb-2rem lg:text-3vw md:pt-2rem ">Product Categories</h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-4 mt-8 ">
        <OurProductCard imageSrc={personalcare} title="Personal Care" subCategory="Personal Care" />
        <OurProductCard imageSrc={skincare} title="Skin Care" subCategory="Skin Care" />
        <OurProductCard imageSrc={protein} title="Protein Powders" subCategory="Protein" />
        <OurProductCard imageSrc={healthandnutrition} title="Health Supplements" subCategory="Supplements" />
        <OurProductCard imageSrc={womencare} title="Women Care" subCategory="Women Care" />
        <OurProductCard imageSrc={babycare} title="Baby Care" subCategory="Baby Care" />
        <OurProductCard imageSrc={healthdevices} title="Health Devices" subCategory="Health Devices" />
        <OurProductCard imageSrc={medicine} title="Medicine" Category="Medicine" />
      </div>
    </div>
  );
}