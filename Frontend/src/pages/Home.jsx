import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import HomeImage from '../Components/HomeImage'
import CircleMouseFollower from '../Components/CircleMouseFollower'
import OurProduct from '../Components/OurProduct'

function Home() {
  return (
    <div className='font-Akaya bg-gray-100'>
       {/* <CircleMouseFollower /> */}
        <Navbar />
        <HomeImage />
        <OurProduct />
        <Footer />
    </div>
  )
}

export default Home
