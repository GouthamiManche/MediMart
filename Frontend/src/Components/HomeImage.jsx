import React from 'react'
import homeimage from '../assets/bgimgfinal.jpg'
import { Link } from 'react-router-dom'
export default function HomeImage() {
  return (
    <div className="relative ">
    <img
      src={homeimage}
      alt="Image 1"
      className="w-full h-[40vh] lg:h-[500px] object-cover "
    />
    <div className="absolute inset-0 flex items-center justify-start px-4 ml-[10vw]">
      <div className="text-white  ">
        <h1 className=" text-3xl md:text-[6vw] font-bold text-white max-w-lg mx-auto font-PlayFair">
         Medimart
        </h1>
        <p className='hidden md:block md:mt-[2.5rem] md:text-xl'>Your trusted online pharmacy, saving you time and money.</p>
        <Link to = '/shop'>
        <button className="mt-4 md:mt-[2rem] bg-[#125872] text-white font-semibold rounded-md py-1 px-[0.5rem] md:py-[2vh] md:px-[2.5vw]">
          Shop Now
        </button>
        </Link>
      </div>
    </div>
  </div>
  )
}
