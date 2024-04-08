import React from 'react'
import { Link } from 'react-router-dom'
export default function HomeImage() {
  return (
    <div className="relative ">
    <img
      src="src/Images/homebg2.jpg"
      alt="Image 1"
      className="w-full h-[50vh] lg:h-[400px] object-cover "
    />
    <div className="absolute inset-0 flex items-center justify-center px-4 ">
      <div className="text-center text-white  ">
        <h1 className=" text-2xl md:text-4xl lg:text-6xl font-bold text-gray-900 max-w-lg mx-auto ">
         MEDIMART
        </h1>
        <Link to = '/shop'>
        <button className="mt-4 bg-gray-900 text-white rounded-md py-1 px-[0.5rem] lg:py-2 lg:px-[3rem]">
          Shop Now
        </button>
        </Link>
      </div>
    </div>
  </div>
  )
}
