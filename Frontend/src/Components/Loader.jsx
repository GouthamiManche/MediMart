import React from 'react'
import loader from '../assets/logo1.jpg'

export default function Loader() {
return (
   <div >
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <img className="w-10 h-20 sizw animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" />
        <h1 className='font-bold text-3xl'>LOADING ...</h1>
      </div>
  </div>
  )
}
