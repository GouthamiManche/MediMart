import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import homeimage from '../assets/bgimgfinal.jpg';
import muscleblaze from '../assets/muscleblaze.jpg'
import hkvitals from '../assets/hkvitals.jpg'
import himalaya from '../assets/himalaya.jpg'
import horlicks from '../assets/horlicks.jpg'
import { Link } from 'react-router-dom';
const HomeImage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  
  };

  return (
    <Slider {...settings} className='mb-[3rem]'>
      <div className="relative">
        <img
          src={homeimage}
          alt="Image 1"
          className="w-full  h-[30vh] lg:h-[420px] object-cover "
        />
        <div className="absolute inset-0 flex items-center justify-start px-4 ml-[10vw]">
          <div className="text-white">
            <h1 className="text-3xl md:text-[6vw] font-bold text-white max-w-lg mx-auto font-PlayFair">
              Medimart
            </h1>
            <p className="hidden md:block md:mt-[2.5rem] md:text-xl">
              Your trusted online pharmacy, saving you time and money.
            </p>
            <Link to="/shop">
              <button className="mt-4 md:mt-[2rem] bg-[#125872] text-white font-semibold rounded-md py-1 px-[0.5rem] md:py-[2vh] md:px-[2.5vw]">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative">
              <img
          src={muscleblaze}
          alt="Image 2"
          className="w-full h-[30vh] lg:h-[420px]"
        />
           </div>
      <div className="relative">
        <img
          src={hkvitals}
          alt="Image 3"
          className="w-full h-[30vh] lg:h-[420px]"
        />
             </div>
      <div className="relative">
        <img
          src={himalaya}
          alt="Image 4"
          className="w-full h-[30vh] lg:h-[420px]"
        />
        </div>
        <div className="relative">
        <img
          src={horlicks}
          alt="Image 4"
          className="w-full h-[30vh] lg:h-[420px]"
        />
        </div>
    </Slider>
  );
};

export default HomeImage;