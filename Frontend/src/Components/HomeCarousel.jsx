import React, { useState, useEffect, useRef } from 'react';

const CustomerTestimonialCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const testimonials = [
    {
      text: "The doctors are very professional and customer-friendly. I fall more in love with this app the more I use it.",
      author: "- Subhash Sehgal"
    },
    {
      text: "Excellent app. I have used this regularly and found it very easy to use. All info is readily available, and the response after order placement for validation of medicines required was prompt.",
      author: "- Snehal Shah"
    },
    {
      text: "Best, very customer-friendly app by nature. TrueMeds is the best... during the Lockdown, this app does not reduce the discount and shows the customer-friendly nature of the TrueMeds. Thank You!",
      author: "- Laksh Kankariya"
    },
    {
      text: "I am impressed by the professionalism and efficiency of the pharmacy staff. They make getting my medications a breeze.",
      author: "- Samantha W."
    },
    {
      text: "The convenience of ordering prescriptions online from this pharmacy has made my life so much easier. Thank you!",
      author: "- James T."
    },
    {
      text: "I appreciate the personalized service I receive every time I visit this pharmacy. They truly care about their customers.",
      author: "- Rebecca S."
    }
  ];

  const handlePrevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth / 2.5,
        behavior: 'smooth'
      });
    }
  };

  const handleNextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth / 2.5,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const carousel = carouselRef.current;
        const slideWidth = carousel.offsetWidth / 3;
        const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
        const currentScrollLeft = carousel.scrollLeft;

        if (currentScrollLeft === 0) {
          setCurrentSlide(0);
        } else if (currentScrollLeft >= maxScrollLeft - slideWidth) {
          setCurrentSlide(testimonials.length - 3);
        } else {
          setCurrentSlide(Math.round(currentScrollLeft / slideWidth));
        }
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [testimonials.length]);

  return (
    <div className="max-w-full mx-auto mt-8 px-5 mb-8 sm:px-18 sm:mt-10 sm:mb-10">
      <h2 className="text-gray-700 text-lg md:text-2xl font-bold mb-4">Customer Testimonials</h2>
      <div className="relative overflow-x-hidden">
        <div
          ref={carouselRef}
          className="carousel flex gap-8 h-64 w-full transition-transform duration-500 ease-in-out overflow-x-scroll scrollbar-hide"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="carousel-item flex flex-col justify-center p-6 rounded-lg bg-blue-100 w-full md:w-1/3 shrink-0"
            >
              <p className="text-base text-center md:text-lg">{testimonial.text}</p>
              <p className="text-sm text-center mt-2">{testimonial.author}</p>
            </div>
          ))}
        </div>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-400 rounded-full p-2 shadow-md z-20 md:block hidden"
          onClick={handlePrevSlide}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-400 rounded-full p-2 shadow-md z-20 md:block hidden"
          onClick={handleNextSlide}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomerTestimonialCarousel;