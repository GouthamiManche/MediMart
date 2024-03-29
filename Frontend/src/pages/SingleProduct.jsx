import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function SingleProduct() {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="text-center text-gray-600">Product not found</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, value)); // Ensure quantity is at least 1
  };

  const handleAddToCart = () => {
    // Implement your logic to add product to cart with selected quantity
    console.log(`Added ${quantity} ${product.Medicine_Name} to cart`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.Image_URL}
              alt={product.Medicine_Name}
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">{product.Medicine_Name}</h2>
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
                <p className="text-2xl text-blue-600 font-semibold">{`₹${product.Price}`}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-l"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                    className="w-16 text-center border border-gray-300 rounded-r py-2"
                  />
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-r"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Reviews</h3>
              <div className="flex items-center mb-4">
                <span className="text-green-500 mr-2">{`Excellent ${product.Excellent_Review}`}%</span>
                <span className="text-gray-600 mr-2">{`Average ${product.Average_Review}`}%</span>
                <span className="text-red-500">{`Poor ${product.Poor_Review}`}%</span>
              </div>
              <div className="space-x-4">
                <button
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  onClick={handleBackClick}
                >
                  Back
                </button>
                <button
                  className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
