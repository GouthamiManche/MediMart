import { OurProductCard } from "./OurProductCard";
export default function OurProduct() {
  return (
    <div className="m-4 md:mx-6rem text-center font-semibold md:pb-4rem">
      <h1 className="text-xl md:text-4xl lg:mb-2rem lg:text-3vw md:pt-2rem">Product Categories</h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-4 mt-8">
        <OurProductCard imageSrc="/src/assets/personalcare.jpg" title="Personal Care" subCategory="personalcare" />
        <OurProductCard imageSrc="/src/assets/skincare.jpg" title="Skin Care" subCategory="skincare" />
        <OurProductCard imageSrc="/src/assets/protein_supplements.jpg" title="Protein Powders" subCategory="protein" />
        <OurProductCard imageSrc="/src/assets/health_and_nutrition.jpg" title="Health Supplements" subCategory="supplements" />
        <OurProductCard imageSrc="/src/assets/womencare.jpg" title="Women Care" subCategory="womencare" />
        <OurProductCard imageSrc="/src/assets/babycare.jpg" title="Baby Care" subCategory="babycare" />
        <OurProductCard imageSrc="/src/assets/healthdevices.jpg" title="Health Devices" subCategory="healthdevices" />
        <OurProductCard imageSrc="/src/assets/medicines.jpg" title="Medicine" Category="Medicine" />
      </div>
    </div>
  );
}