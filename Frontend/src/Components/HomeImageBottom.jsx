import React from 'react'

export default function HomeImageBottom() {
  return (
    <div className='relative'>
  <div className='flex h-[16rem] w-full items-end mb-[0.5rem] justify-center'>
    <img src="/src/Images/beforefooter.jpg" alt="" className='w-[30%] h-[10rem]' />
  </div>
  <div className='absolute top-0 left-0 w-full text-center'>
    <p className='text-gray-300 text-2xl font-bold'>Order medicines online from Medimart at the best prices.</p>
    <p className='text-gray-300 text-2xl'>An online pharmacy you can trust.</p>
  </div>
</div>
  )
}
