import React, { useState, useEffect ,useContext} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HorizontalCardScroll from '../Components/HorizontalCardScroll';
import axios from "axios";
import ReviewSection from '../Components/ReviewSection';
import { BsCart3 } from "react-icons/bs";import { AuthContext } from '../Components/AuthProvider';
import { toast } from 'react-toastify';
import checkUserLoggedIn from '../Components/UseAuth'
import { useAuth } from '../Components/UseAuth';

const Category = () => {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
const isLoggedIn = checkUserLoggedIn(isAuthenticated);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products?category=Other", {
          headers: {
            apikey: "123",
          },
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Retrieve existing cart items from local storage once during initial mount
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    fetchData();
  }, []);

  if (!product) {
    return <div className="text-center text-gray-600">Product not found</div>;
  }

  const isMedicine = !!product.Medicine_Name;

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, value));
  };

  // const handleAddToCart = (product, quantity) => {
  //   const cartItem = {
  //     ...product,
  //     quantity,
  //     isMedicine: !!product.Medicine_Name,
  //   };

  //   // Update cart items state
  //   setCartItems((prevCartItems) => {
  //     const updatedCartItems = [...prevCartItems, cartItem];
  //     // Update local storage with the updated cart items
  //     localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  //     return updatedCartItems;
  //   });
  // };
  const { isAuthenticated } = useContext(AuthContext);
  const handleAddToCart = (product, quantity) => {
    // Check if the user is logged in (you need to implement this logic)
    const isLoggedIn = checkUserLoggedIn(); // Implement this function

    if (!isAuthenticated) {
      // If the user is not logged in, navigate to the login page
      navigate('/Login');
      return;
    }

    // If the user is logged in, proceed with adding the item to the cart
    const cartItem = {
      ...product,
      quantity,
      isMedicine: !!product.Medicine_Name,
    };

    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems, cartItem];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };



  // const handleReviewClick = () => {
  //   setShowReviewModal(true);
  // };

  // const handleSubmitReview = (review) => {
  //   setReviews((prevReviews) => [...prevReviews, review]);
  // };

  return (
    <div>
      <div className="bg-white min-h-screen md:p-[1px] p-[1rem]">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center md:block">
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
              <img
                src={product.Image_URL}
                alt={isMedicine ? product.Medicine_Name : product.Name}
                className="md:w-[26rem] md:max-h-[22rem] md:ml-[4rem] mt-4 md:mt-[3rem] rounded-md border border-2"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mt-[5rem] mb-[2rem] text-gray-800">
                  {isMedicine ? product.Medicine_Name : product.Name}
                </h2>
                <div className="bg-white rounded-lg mb-[0.5rem]">
                  <p className="text-gray-600"><span className='text-lg font-semibold text-gray-700'> Manufacturer :</span> {product.Manufacturer}</p>
                </div>
                {isMedicine ? (
                  <>
                    <div className=" bg-white rounded-lg mb-[0.5rem]">
                      <p className="text-gray-600"><span className="text-lg font-semibold  text-gray-700">Composition :</span> {product.Composition}</p>
                    </div>
                    <div className="bg-white rounded-lg mb-[0.5rem]">
                      <p className="text-gray-600"><span className="text-lg font-semibold  text-gray-700">Uses :</span> {product.Uses}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className=" bg-white rounded-lg mb-[0.5rem]">
                      <p className="text-gray-600"><span className="text-lg font-semibold text-gray-700">Description :</span> {product.Description}</p>
                    </div>
                    <div className=" bg-white rounded-lg mb-[0.5rem]">
                      <h3 ></h3>
                      <p className="text-gray-600"><span className="text-lg font-semibold  text-gray-700">Directions for Use :</span> {product['Directions for Use']}</p>
                    </div>
                  </>
                )}
                <div className="mb-4">
                  <p className="text-3xl md:text-4xl text-blue-800 font-semibold">{`₹${product.Price}`}</p>
                </div>
                <div className="mb-4 bg-white rounded-lg mb-[0.5rem]">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Quantity</h3>
                  <div className="flex mt-[1rem]">
                    <button
                      className="bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700 px-4 py-2 rounded transition-colors duration-300 focus:outline-none"
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
                      className="bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700 px-4 py-2 rounded transition-colors duration-300 focus:outline-none"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      +
                    </button>
                    <div className="md:ml-[12rem] ml-[2rem]">
                      <button
                        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:px-8 px-[6px] rounded transition-colors duration-300"
                        onClick={() => handleAddToCart(product, quantity)}
                      >
                        <BsCart3 className="mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='md:mt-[2rem]'>
          <HorizontalCardScroll itemForHorizontalScroll={items} />
          <ReviewSection />
        </div>
      </div>
    </div>
  );
};

export default Category;