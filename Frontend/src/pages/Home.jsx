import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import HomeImage from '../Components/HomeImage'
//import CircleMouseFollower from '../Components/CircleMouseFollower'
import OurProduct from '../Components/OurProduct'
import { RiNumber1 , RiNumber2,RiNumber3,RiNumber4} from "react-icons/ri";

function Home() {
  return (
    <div className=''>
      {/* <CircleMouseFollower /> */}
      <Navbar />
      <HomeImage />
      <OurProduct />

      <div className="flex border">
        <div className='bg-blue-100 m-7 p-7 border rounded-lg'>
          <p className='text-2xl font-semibold '>Get 15% off on Medicine Purchases</p>
          <p>and get 15% off on your order</p>
          <div className='flex'>
            <p className='text-2xl font-semibold'>Order now</p>
            <img src='https://images.apollo247.in/images/ui_revamp_Prescription_Pot.svg'></img>
          </div>
        </div>
        <div className='bg-blue-100 w-full m-7 p-7'>
          <div className='text-lg font-semibold'>
            <p>How does this work?</p>
            <div className="flex flex-wrap -mx-4">
              <div className="w-1/2 px-4">
                <span>1.Add medicines to your cart</span><br></br><br></br>
                <span>3.We will call you to confirm the medicines</span>
              </div>
              <div className="w-1/2 px-4">
                <span>2.Add delivery address and place the order</span><br></br><br></br>
                <span>4.Your medicines will get delivered at your doorstep</span>
              </div>
            </div>
            <p>Get 15% off on Medicine Purchases and get 15% off on your order. Order now</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Home
