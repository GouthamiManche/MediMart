import React from 'react'

function Card() {
  return (
  <div className="max-w-xs w-[16rem] rounded overflow-hidden shadow-lg bg-transparent border-2 mt-[4rem]">
    <div className=''> 
    <img className="w-[100%] h-[10rem] object-contain" src="https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/cropped/ktaklgpxpq94qk1tfffg.jpg" alt="Sunset in the mountains" />
    </div>
    <div className="px-2 py-2 ">
      <div className="font-bold text-[1rem] mb-1">HYDROXYZINE HYDROCHLORIDE SYRUP USP</div>
      <p className="text-gray-700 text-xs">
        Text for medicine
      </p>
    </div>
    <div className="px-2 py-2">
      <select className=''>
      {Array.from(Array(6),(e,i)=>{
        return <option key={i+1} value={i+1} >{`Q${i+1}`}</option>
      })}
      </select>
      <div className='inline ml-[1.2rem] font-semibold'>Total Price</div>
    </div>
  </div>


  )
}

export default Card
