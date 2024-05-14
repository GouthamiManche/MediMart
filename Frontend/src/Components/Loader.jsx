import React from 'react'
import loader from '../assets/logo1.jpg'
import loadinggif from "../assets/LoadingGIFF.gif"

export default function Loader() {
return (
   <div >
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <img className="max-w-full max-h-full animate-spin" src={loadinggif} alt="Loading icon" />
        {/* <h1 className='font-bold text-3xl'>LOADING ...</h1> */}
      </div>
  </div>
  )
}
