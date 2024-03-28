import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
export default function SingleProduct() {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate();
  if (!product) {
    return <div className="text-center text-gray-600">Product not found</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="">
      <Navbar/>
      <div className="max-w-[100%] mx-[10rem] mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.Image_URL}
              alt={product.Medicine_Name}
              className="max-w-[80%] h-auto pt-[5rem] object-cover rounded-lg"
            />
          </div>
          <div className='ml-[4rem]'>
            <h2 className=" text-2xl mt-[2rem] md:text-4xl font-bold mb-4">
              {product.Medicine_Name}
            </h2>
           
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Uses</h3>
              <p>{product.Uses}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Composition</h3>
              <p>{product.Composition}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Manufacturer</h3>
              <p>{product.Manufacturer}</p>
            </div>
            <div className="mb-4">
              <p className='text-3xl text-blue-600 font-bold'>{`₹${product.Price}`}</p>
            </div>
         
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Reviews</h3>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">
                  {`Excellent ${product.Excellent_Review}`}%
                </span>
                <span className="text-gray-600 mr-2">
                  {`Average ${product.Average_Review}`}%
                </span>
                <span className="text-red-500">{`Poor ${product.Poor_Review}`}%</span>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 mb-[40%]"
              onClick={handleBackClick}
            >
              Back
            </button>

          </div>
        </div>
      </div>
      <Footer/>
    </div>

  )
}
