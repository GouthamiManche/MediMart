import React from 'react'

export default function Loader() {
return (
   <div className="flex items-center justify-center h-screen bg-gray-200">
        <div>
          <img src="/src/Images/logo1.jpg" alt="Loading" className="w-28 h-28 animate-spin" />
        
          <h1 className='font-bold text-3xl'>LOADING ...</h1>
        </div>
  </div>
  )
}
