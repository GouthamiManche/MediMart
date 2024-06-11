import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeImage = () => {
  const [bannerPhotos, setBannerPhotos] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
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

  useEffect(() => {
    const fetchBannerPhotos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/bannerPhotos`);
        setBannerPhotos(response.data);
      } catch (error) {
        console.error('Error fetching banner photos:', error);
      }
    };

    fetchBannerPhotos();
  }, []);

  return (
    <Link to='http://localhost:5173/Skin-Care/Himalaya-Neem-Face-Wash'>
    <Slider {...settings} className="mb-[2rem]">
      {bannerPhotos.map((photo, index) => (
        <div key={index} className="relative">
         
          <img
            src={photo.Image}
            alt={photo.Title}
            className="w-full h-[22vh] md:h-[420px] md:object-cover"
          />
       
          <div className="absolute inset-0 flex items-center justify-start px-4 ml-[10vw]">
            <div className="text-white">
              {/* <h1 className="text-3xl md:text-[6vw] font-bold text-white max-w-lg mx-auto font-PlayFair">
                {photo.Title}
              </h1> */}
              {/* <p className="hidden md:block md:mt-[2.5rem] md:text-xl">
                Your trusted online pharmacy, saving you time and money.
              </p> */}
              {/* <Link to="/shop">
                <button className="mt-4 md:mt-[2rem] bg-[#125872] text-white font-semibold rounded-md py-1 px-[0.5rem] md:py-[2vh] md:px-[2.5vw]">
                  Shop Now
                </button>
              </Link> */}
            </div>
          </div>
        </div>
      ))}
    </Slider>
    </Link>
  );
};

export default HomeImage;