import React from 'react'
import OurProductCard from '../Components/OurProductCard'
export default function OurProduct() {
  return (
    <div className='text-4xl h-screen m-[2rem] text-center pt-[2rem] font-semibold '>
      <h1>Our Products</h1>
      <div className='flex flex-col sm:flex-row justify-center justify-between object-cover h-[62%] '>
       <OurProductCard imageSrc="/src/Images/Tablets.jpeg" title="Tablets" />
       <OurProductCard imageSrc="/src/Images/Cream.jpeg" title="Creams" />
       <OurProductCard imageSrc="/src/Images/syrup.jpg" title="Syrups" />
       <OurProductCard imageSrc="/src/Images/Injections.jpg" title="Injections" />
      </div>
     <div className=''>
      <ul className='flex flex-col sm:flex-row justify-between px-[2rem] py-6 text-xl'>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Tablets</li>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Creams</li>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Syrups</li>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Injections</li>
      </ul>
     </div>
     <p className='mt-[5rem]'>And Many More ...</p>
    </div>

  )
}
