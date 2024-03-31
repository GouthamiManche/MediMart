import React from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

import ProductDetail from '../Components/ProductDetail';

function Shop() {
  const { pg } = useParams();

  return (
    <div className=''>
      <Navbar />
      <ProductDetail pg={pg} />
      <Footer />
    </div>
  )
}

export default Shop