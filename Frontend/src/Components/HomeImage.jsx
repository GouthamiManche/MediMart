import React from 'react'

function HomeImage() {
  return (
    <div className='content'>
        <div className='absolute top-[4rem]'>
        <img src="src/Images/download.png"/>
        </div>
          <div>
        <h1 className="absolute top-[20rem] right-2 font-serif text-4xl font-extrabold text-gray-900 ml-8 w-[590px]">Online medicine store, where health meets doorstep delivery</h1>
        <button className=" absolute top-[27rem] right-[20rem] bg-blue-500 text-white rounded border-2 font-bold py-2 px-4 w-[8rem]">Shop</button></div>
    </div>
  )
}

export default HomeImage