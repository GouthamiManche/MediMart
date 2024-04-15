import { Link } from 'react-router-dom';
export function OurProductCard({ imageSrc, title, subCategory, Category }) {
  return (
    <Link to={`/shop?subCategory=${subCategory || ''}&Category=${Category || ''}`}>
      <div className="w-full md:w-[20vw]  mt-2vh transition-transform duration-300 transform hover:scale-105">
        <img className="w-full h-56 md:h-[20rem] md:w-16rem object-contain lg:object-cover md:object-cover rounded-2xl" src={imageSrc} alt="Product" />
        <div className="p-4">
          <h2 className="text-base md:text-lg lg:text-2vw font-semibold">{title}</h2>
        </div>
      </div>
    </Link>
  );
}
