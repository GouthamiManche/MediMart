import React from 'react';

function HomeImage() {
  return (
    <div className="relative ">
      <img
        src="src/Images/BgBlue.jpg"
        alt="Image 1"
        className="w-full h-[500px] object-cover "
      />
      <div className="absolute inset-0 flex items-center justify-center px-4 ">
        <div className="text-center text-white font-Akaya ">
          <h1 className=" text-xl md:text-4xl lg:text-6xl font-extrabold text-gray-900 max-w-lg mx-auto ">
           MEDIMART
          </h1>
          <button className="mt-4 bg-black text-white rounded-md py-2 px-[3rem]">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeImage;