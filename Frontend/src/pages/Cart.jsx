import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { BsTrash } from 'react-icons/bs';
import HorizontalCardScrollCart from '../Components/HorizontalCardScrollCart';
import LoadingGif from "../Components/LoadingGif";
import { AuthContext } from '../Components/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentSummary from '../Components/PaymentSummary';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const location = useLocation();
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [totalPrice, setTotalPrice] = useState(0);

  // Initialize local storage values when the component mounts
  useEffect(() => {
    localStorage.setItem('discount', '0');
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products?category=Other`, {
          headers: {
            apikey: apiKey,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        // Fetch cart items from the API
        const response = await axios.get(`${apiUrl}/getcartitems?email=${user.email}`, {
          headers: {
            apikey: apiKey,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user.email]);

  const handleRemoveFromCart = async (index, productId) => {
    try {
      await axios.delete(`${apiUrl}/removefromcart/${productId}`);
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1);
      setCartItems(updatedCartItems);
      //toast.success('Product removed from cart successfully', { autoClose: 2000 });
    } catch (error) {
      console.error("Error removing product from cart:", error.message);
      toast.error('Failed to remove product from cart', { autoClose: 2000 });
    }
  };

  const handleQuantityChange = async (index, newQuantity) => {
    try {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity = newQuantity;
      setCartItems(updatedCartItems);
      await axios.put(`${apiUrl}/updatecart/${updatedCartItems[index].Product_id}`, {
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error.message);
      toast.error('Failed to update quantity', { autoClose: 2000 });
    }
  };

  const handleSubmit = () => {
    if (cartItems.length === 0) {
      toast.warning('Please shop products', { autoClose: 2000 });
      return navigate('/shop');
    }

    if (!isAuthenticated) {
      toast.warning('Please login', { autoClose: 2000 });
      navigate('/login');
      console.log('User is not logged in. Please log in to add items to the cart.');
      return;
    }

    navigate("/checkout");
  };

  const handleApplyCoupon = (couponCode) => {
    const validCoupons = ['SAVE10', 'GET20', 'DISCOUNT30', 'FIRST50'];

    if (!couponCode) {
      setDiscountPercentage(0);
      updateTotalPrice(cartItems, 0);
    }

    if (validCoupons.includes(couponCode)) {
      let discountPercentage = 0;
      switch (couponCode) {
        case 'SAVE10':
          discountPercentage = 10;
          break;
        case 'GET20':
          discountPercentage = 20;
          break;
        case 'DISCOUNT30':
          discountPercentage = 30;
          break;
        case 'FIRST50':
          discountPercentage = 50;
          break;
        default:
          discountPercentage = 0;
          break;
      }
      setDiscountPercentage(discountPercentage);
      updateTotalPrice(cartItems, discountPercentage);
      toast.success('Coupon applied successfully', { autoClose: 2000 });
    } else {
      toast.error('Invalid coupon', { autoClose: 2000 });
    }
  };

  useEffect(() => {
    updateTotalPrice(cartItems, discountPercentage);
  }, [cartItems, discountPercentage]);

  const updateTotalPrice = (items, discount) => {
    const newTotalPrice = calculateTotalPrice(items, discount);
    localStorage.setItem('totalPrice', JSON.stringify(newTotalPrice));
    setTotalPrice(newTotalPrice);
  };

  const calculateTotalPrice = (items, discount) => {
    const cartTotal = items.reduce((total, item) => total + item.Price * item.quantity, 0);
    const discountAmount = (cartTotal * discount) / 100;
    return cartTotal - discountAmount;
  };
  if (isLoading) {
    return <LoadingGif />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl font-semibold text-gray-700">Your cart is empty</p>
        <p className="mt-4">Please shop for products to add them to your cart.</p>
        <button
          className="mt-8 bg-[#125872] text-white px-4 py-2 rounded-md"
          onClick={() => navigate('/shop')}
        >
          Shop Now
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="hidden md:block">
        <div className="flex justify-between mx-auto max-w-7xl py-8">
          <div className="w-3/5">
            <h2 className="text-2xl text-gray-700 font-bold mb-4">Order Summary</h2>
            <div className="bg-white p-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center border rounded-md border-gray-300 mb-4">
                  <div className="flex ml-[2rem] items-center justify-center w-24 h-24 my-[1rem]">
                    <img
                      src={item.Image_URL}
                      alt={item.isMedicine ? item.Medicine_Name : item.Name}
                      className="max-w-full h-24"
                    />
                  </div>
                  <div className='ml-[2rem]'>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.isMedicine ? item.Medicine_Name : item.Name}
                      </h3>
                    </div>
                    <p className=''>{item.Manufacturer}</p>
                    <p className="text-lg font-semibold">{`₹${item.Price}`}</p>
                  </div>
                  <div className="flex items-center mr-[2rem] ml-auto mt-2 gap-2">
                    <div className="flex items-center border rounded-md px-2 py-1">
                      <button
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => handleQuantityChange(index, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="text-gray-500 hover:text-gray-800"
                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="ml-4 font-semibold">{`₹${item.Price * item.quantity}`}</p>
                    <button
                      className="ml-4 text-red-400 hover:text-red-600"
                      onClick={() => handleRemoveFromCart(index, item.Product_id)}
                    >
                      <BsTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <PaymentSummary
            cartItems={cartItems}
            discountPercentage={discountPercentage}
            coupon={coupon}
            setCoupon={setCoupon}
            handleApplyCoupon={handleApplyCoupon}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className="md:hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="bg-white rounded-md mb-4">
              <div className="flex items-center p-4 border-b border-gray-200">
                <div className="w-1/3">
                  <img
                    src={item.Image_URL}
                    alt={item.isMedicine ? item.Medicine_Name : item.Name}
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <div className="w-2/3 pl-4">
                  <h3 className="text-lg font-semibold">
                    {item.isMedicine ? item.Medicine_Name : item.Name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.Manufacturer}</p>
                  <p className="text-lg font-semibold">{`₹${item.Price}`}</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center">
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() => handleQuantityChange(index, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={() => handleQuantityChange(index, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <p className="text-lg font-semibold">{`₹${item.Price * item.quantity}`}</p>
                </div>
                <div>
                  <button
                    className="text-red-400 hover:text-red-600"
                    onClick={() => handleRemoveFromCart(index, item.Product_id)}
                  >
                    <BsTrash className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <PaymentSummary
          cartItems={cartItems}
          discountPercentage={discountPercentage}
          coupon={coupon}
          setCoupon={setCoupon}
          handleApplyCoupon={handleApplyCoupon}
          handleSubmit={handleSubmit}
        />
      </div>
<div className='md:mt-[2rem]'>
  <HorizontalCardScrollCart itemForHorizontalScrollCart={items} />
</div>
</>

  );
};

export default Cart;

