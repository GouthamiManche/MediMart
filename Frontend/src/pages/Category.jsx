import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HorizontalCardScroll from '../Components/HorizontalCardScroll';
import axios from "axios";
import ReviewSection from '../Components/ReviewSection';
import { BsCart3 } from "react-icons/bs";
import { AuthContext } from '../Components/AuthProvider';
import LoadingGif from "../Components/LoadingGif";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactImageMagnify from 'react-image-magnify';

const Category = () => {
  const { subCategory, formattedName } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]); // Initialize items state
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { isAuthenticated, user } = useContext(AuthContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products?sub_category=${subCategory}`, {
          headers: {
            apikey: apiKey,
          },
        });        
        const productData = response.data.find(item => 
          item.Name.replace(/ /g, '-') === formattedName
        );
        setItems(response.data)
        if (productData) {
          setProduct(productData);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setProduct(null);
      } 
    };
    fetchData();
  }, [subCategory, formattedName]);

  if (!product) {
    return <div className="text-center text-gray-600">Product not found</div>;
  }

  const isMedicine = !!product.Medicine_Name;

  const handleBackClick = () => {
    navigate(-1);
  };
  const handleQuantityChange = async (value) => {
    const newQuantity = Math.max(1, value);

    setQuantity(newQuantity);

    if (isAuthenticated) {
      try {
        const cartItem = {
          Product_id: product.Product_id,
          quantity: newQuantity
        };

        await axios.put(`${apiUrl}/updatecart/${product.Product_id}`, cartItem);
      } catch (error) {
        console.error("Error updating cart:", error.message);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add item to cart');
      navigate('/login');
      return;
    }

    if (!product.Stock || product.Stock.toLowerCase() !== 'in stock') {
      toast.error('Product is out of stock');
      return;
    }

    const { _id, Name, Price, Image_URL, Product_id } = product;
    const cartItem = {
      _id,
      Name,
      Price,
      Image_URL,
      quantity,
      Product_id,
      email: user.email
    };

    setIsLoading(true); // Set loading to true when the button is clicked

    try {
      await axios.post(`${apiUrl}/addtocart`, cartItem);
      toast.success('Item Added To Cart', { autoClose: 2000 });
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false); // Set loading back to false after the operation is complete
    }
  };


  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const productImages = [
    product.Image_URL,
    product.Image_URL,
    product.Image_URL,
    product.Image_URL,
  ];

  return (
    <div>
      <div className="bg-white min-h-screen md:p-[1px] p-[1rem] ">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex md:block flex-col">
              <button
                className="hidden md:block bg-white rounded-full p-2 transition-colors duration-300 hover:bg-gray-200"
                onClick={handleBackClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600 hover:text-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <div className="flex justify-center items-center">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: isMedicine ? product.Medicine_Name : product.Name,
                      isFluidWidth: true,
                      src: productImages[currentImageIndex],
                      sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                    },
                    largeImage: {
                      src: productImages[currentImageIndex],
                      width: 888,
                      height: 888,
                    },
                    shouldUsePositiveSpaceLens: true,
                    className: "md:max-w-[24rem] md:max-h-[24rem] hover:bg-white",
                    enlargedImageContainerDimensions: { width: '220%', height: '120%' },
                    enlargedImagePosition: 'beside',
                    isHintEnabled: true,
                    shouldHideHintAfterFirstBigViewOpened: true,
                    isEnlargedImagePortalEnabledForTouch: true,
                    lensStyle: {
                      lensStyle: {
                        background: 'rgba(77, 144, 254, 0.3)',
                        border: '1px solid #4d90fe',
                      },
                    },
                  }}
                />
              </div>
              <div className="md:hidden mt-4 overflow-x-auto flex">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`mr-2 border border-gray-300 p-1 cursor-pointer ${currentImageIndex === index ? 'border-blue-500' : ''
                      }`}
                    onClick={() => handleImageChange(index)}
                  >
                    <img src={image} alt={`Product Image ${index}`} className="w-16 h-16 object-cover" />
                  </div>
                ))}
              </div>
              <div className="md:flex hidden md:ml-[8rem] md:mt-[2rem] md:mr-4 overflow-x-auto md:overflow-x-visible flex md:flex-row">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`mb-2 md:mb-0 md:mr-2 border border-gray-300 p-1 cursor-pointer ${currentImageIndex === index ? 'border-blue-500' : ''
                      }`}
                    onClick={() => handleImageChange(index)}
                  >
                    <img src={image} alt={`Product Image ${index}`} className="w-16 h-16 object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mt-[5rem] mb-[2rem] text-gray-800">
                  {isMedicine ? product.Medicine_Name : product.Name}
                </h2>
                <div className="bg-white rounded-lg mb-[0.5rem]">
                  <p className="text-gray-600"><span className='text-lg font-semibold text-gray-700'> Manufacturer :</span> {product.Manufacturer}</p>
                </div>
                {product.Composition && (
                  <div className=" bg-white rounded-lg mb-[0.5rem]">
                    <p className="text-gray-600"><span className="text-lg font-semibold  text-gray-700">Composition :</span> {product.Composition}</p>
                  </div>
                )}
                {product.Uses && (
                  <div className="bg-white rounded-lg mb-[0.5rem]">
                    <p className="text-gray-600"><span className="text-lg font-semibold  text-gray-700">Uses :</span> {product.Uses}</p>
                  </div>
                )}
                {product.Description && (
                  <div className=" bg-white rounded-lg mb-[0.5rem]">
                    <p className="text-gray-600"><span className="text-lg font-semibold text-gray-700">Description :</span> {product.Description}</p>
                  </div>
                )}
                {product.Stock && (
                  <div className=" bg-white rounded-lg  mb-[0.5rem]">
                    <p className="text-gray-600 "><span className="text-lg text-bold text-gray-700"></span> {product.Stock}</p>
                  </div>
                )}
                {product['Directions for Use'] && (
                  <div className=" bg-white rounded-lg mb-[0.5rem]">
                    <h3 ></h3>
                    <p className="text-gray-600"><span className="text-lg font-semibold  text-gray-700">Directions for Use :</span> {product['Directions for Use']}</p>
                  </div>
                )}
                <div className="mb-4">
                  <p className="text-3xl md:text-4xl text-blue-800 font-semibold">{`₹${product.Price}`}</p>
                </div>
                <div className="mb-4 bg-white rounded-lg mb-[0.5rem]">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Quantity</h3>
                  <div className="flex mt-[1rem]">
                    <button
                      className="bg-gray-200 text-gray-600  px-4 py-2 rounded transition-colors duration-300 focus:outline-none"
                      onClick={() => handleQuantityChange(quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                      className="w-8 text-center text-gray-700 ml-4"
                    />
                    <button
                      className="bg-gray-200 text-gray-600  px-4 py-2 rounded transition-colors duration-300 focus:outline-none"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      +
                    </button>
                    <div className="md:ml-[12rem] ml-[2rem]">
                      <button
                        className={`flex items-center justify-center bg-[#125872] text-white font-bold py-2 md:px-8 px-[6px] rounded transition-colors duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        onClick={handleAddToCart}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Adding to Cart...' : (
                          <>
                            <BsCart3 className="mr-2" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {isLoading ? (
            <LoadingGif />
          ) : (
            <div className='md:mt-[2rem]'>
              <HorizontalCardScroll itemForHorizontalScroll={items} />
              <ReviewSection />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
