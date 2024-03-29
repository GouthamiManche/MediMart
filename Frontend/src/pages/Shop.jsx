import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import SearchBar from '../Components/SearchBar'

function Shop() {
  const { pg } = useParams();

  return (
    <div className=''>
      <Navbar />
      <SearchBar pg={pg} />
      <Footer />
    </div>
  )
}

export default Shop