import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import CircleMouseFollower from '../Components/CircleMouseFollower'
import SearchBar from '../Components/SearchBar'
import DataCards from '../Components/DataCards'

function Shop() {
  return (
    <div className='font-Akaya'>
      {/* <CircleMouseFollower /> */}
        <Navbar/>
        {/* <DataCards /> */}
       <SearchBar />
        <Footer/>
    </div>
  )
}

export default Shop