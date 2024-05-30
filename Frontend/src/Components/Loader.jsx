import React from 'react'
import loader from '../assets/logo1.jpg'
import loadinggif from "../assets/282.gif"

export default function Loader() {
  return (
    <div >
      <div className="flex items-center justify-center h-screen ">
        <img className="max-w-full max-h-full " src={loadinggif} alt="Loading icon" />
        {/* <h1 className='font-bold text-3xl'>LOADING ...</h1> */}
      </div>
    </div>
  )
}
