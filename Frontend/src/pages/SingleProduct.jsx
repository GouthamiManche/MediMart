import React from 'react';
import { useLocation } from 'react-router-dom';



export default function SingleProduct() {
  const location = useLocation();
  const product = location.state;
  if (!product) {
    return <div className="text-center text-gray-600">Product not found</div>;
  }



  return (
    <div className="container mx-auto mt-8 px-4">
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.Image_URL}
            alt={product.Medicine_Name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {product.Medicine_Name}
          </h2>
          <p className="text-gray-600 mb-4">{product.Composition}</p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Uses:</h3>
            <p>{product.Uses}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Side Effects:</h3>
            <p>{product.Side_effects}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Manufacturer:</h3>
            <p>{product.Manufacturer}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Reviews:</h3>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">
                {product['Excellent Review %']}%
              </span>
              <span className="text-gray-600 mr-2">
                {product['Average Review %']}%
              </span>
              <span className="text-red-500">{product['Poor Review %']}%</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>

  )
}
