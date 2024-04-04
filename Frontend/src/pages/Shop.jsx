import React from 'react'
import { useParams} from 'react-router-dom';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

import ProductDetail from '../Components/ProductDetail';

function Shop() {
  const { pg } = useParams();
  const { category } = useParams();


  return (
    <div className=''>
      <Navbar />
      <ProductDetail category={category} pg={pg} />
      <Footer />
    </div>
  )
}

export default Shop