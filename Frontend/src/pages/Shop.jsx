import React from 'react'
import { useParams} from 'react-router-dom';
import ProductDetail from '../Components/ProductDetail';

function Shop() {
  const { pg } = useParams();
  const { category } = useParams();


  return (
    <div className=''>    
      <ProductDetail category={category} pg={pg} />
    </div>
  )
}

export default Shop