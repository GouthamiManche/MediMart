import React from 'react'
import OurProductCard from '../Components/OurProductCard'
export default function OurProduct() {
  return (
  
    <div className='text-4xl h-screen m-[6rem] text-center pt-[2rem] font-semibold '>
      <h1>Our Products</h1>
      <div className='flex justify-center justify-between object-cover h-[62%] '>
       <OurProductCard imageSrc="/src/Images/Tablets.jpeg"/>
       <OurProductCard imageSrc="/src/Images/Cream.jpeg" />
       <OurProductCard imageSrc="/src/Images/syrup.jpg"/>
       <OurProductCard imageSrc="/src/Images/Injections.jpg"/>
      </div>
     <div className=''>
      <ul className='flex justify-between px-14 py-6 '>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Tablets</li>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Creams</li>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Syrups</li>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Injections</li>
      </ul>
     </div>
    </div>
   
  )
}
