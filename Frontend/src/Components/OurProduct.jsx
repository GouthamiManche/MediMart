import React from 'react'
import {Link} from 'react-router-dom'
import OurProductCard from '../Components/OurProductCard'
export default function OurProduct() {
  return (
  
    <div className='text-4xl h-screen m-[4rem] text-center pt-[2rem] font-semibold '>
      <h1>Our Products</h1>
      <div className='flex justify-center justify-between object-cover h-[62%]  '>
       <Link to="/tablet"><OurProductCard imageSrc="/src/Images/Tablets.jpg" /></Link>
       <Link to="/cream"><OurProductCard imageSrc="/src/Images/Cream.jpeg" /></Link>
       <Link to="/syrup"><OurProductCard imageSrc="/src/Images/syrup.jpg"/></Link>
       <Link to="/injections"><OurProductCard imageSrc="/src/Images/Injections.jpg"/></Link>
      </div>
     <div className=''>
      <ul className='flex justify-between px-[5rem] mt-[8rem]'>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Tablets</li>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Creams</li>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Syrups</li>
        <li className='transition duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500'>Injections</li>
      </ul>
     </div>
     <p className='mt-[5rem]'>And Many More ...</p>
    </div>
  );
}