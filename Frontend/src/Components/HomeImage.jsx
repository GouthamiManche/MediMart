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
    <Slider {...settings} className="mb-[2rem]">
      {bannerPhotos.map((photo, index) => (
        <div key={index} className="relative">
          <Link to={photo.Link}> {/* Use the Link field from the photo object */}
            <img
              src={photo.Image}
              alt={photo.Title}
              className="w-full h-[22vh] md:h-[420px] md:object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-start px-4 ml-[10vw]">
              <div className="text-white">
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default HomeImage;
