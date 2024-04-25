import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import homeimage from '../assets/bgimgfinal.jpg';
import { Link } from 'react-router-dom';

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute left-4 z-10 cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute right-4 z-10 cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
};

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
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Slider {...settings} className='mb-[2rem]'>
      <div className="relative">
        <img
          src={homeimage}
          alt="Image 1"
          className="w-full  h-[40vh] lg:h-[450px] object-cover "
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
      {/* Add three more slides with the same content */}
      <div className="relative">
        <img
          src={homeimage}
          alt="Image 2"
          className="w-full h-[40vh] lg:h-[450px] object-cover"
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
          src={homeimage}
          alt="Image 3"
          className="w-full h-[40vh] lg:h-[450px] object-cover"
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
          src={homeimage}
          alt="Image 4"
          className="w-full h-[40vh] lg:h-[450px] object-cover"
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
    </Slider>
  );
};

export default HomeImage;