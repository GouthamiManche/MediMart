import React, { useState, useContext } from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../Components/AuthProvider';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function truncateString(str, num) {
  if (!str || str.length === 0) return "";
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

function Item({ item }) {
  const { user } = useContext(AuthContext);
  const [isItemInCart, setIsItemInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to the cart");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        "https://medicine-website-two.vercel.app/api/addtocart",
        {
          Name: item.Name,
          Price: item.Price,
          Image_URL: item.Image_URL,
          quantity: quantity,
          Product_id: item.Product_id,
          email: user.email,
        }
      );
      if (res.status === 201) {
        setIsItemInCart(true);
      }
    } catch (error) {
     console.log(error)
    }
  };

  const removeFromCart = async () => {
    try {
      await axios.delete(
        `https://medicine-website-two.vercel.app/api/removefromcart/${item.Product_id}`,
      );
      setIsItemInCart(false);
    } catch (error) {
      
     
    }
  };

  const handleQuantityChange = async (value) => {
    const newQuantity = Math.max(1, value); // Ensure minimum quantity is 1
    setQuantity(newQuantity);

    if (newQuantity === 1) {
      removeFromCart(); // Remove item from cart if quantity is 1
    }

    try {
      const res = await axios.put(
        `https://medicine-website-two.vercel.app/api/updatecart/${item.Product_id}`,
        {
          quantity: newQuantity,
        }
      );
      if (res.status !== 200) {
       
      }
    } catch (error) {
     
   
    }
  };

  const truncatedName = truncateString(item.Medicine_Name || item.Name, 20);

  return (
    <div className="bg-white m-2 p-4 rounded-xl border border-gray-200 hover:border-[#125872] flex flex-col md:w-[16rem] w-[16rem] md:h-[22rem] h-[22rem] overflow-hidden  transition duration-300 ">
      <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
        <div className="relative h-56 overflow-hidden rounded-lg flex items-center justify-center">
          <img
            src={item.Image_URL}
            alt={item.Medicine_Name || item.Name}
            className="max-w-full max-h-full"
          />
        </div>
      </Link>
      <hr className="border border-gray-300 " />
      <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
        <div className="flex flex-col justify-between mt-6 relative">
          <h3 className="font-semibold text-lg text-[#125872]">
            {truncatedName}
          </h3>
        </div>
      </Link>
      <div className="flex justify-between items-center mt-2">
        <h3 className="text-2xl font-bold text-[#323743FF]">₹{item.Price}</h3>
        {isItemInCart ? (
          <div className="flex items-center font-semi-bold  bg-[#125872]  rounded-md px-4 py-1 shadow-md">
            <button
              className="text-white"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              -
            </button>
            <span className="mx-4 text-white">{quantity}</span>
            <button
              className="text-white"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="flex items-center justify-center bg-[#12587222] border-[#125872]  text-[#125872] rounded-md font-bold border py-1.5 px-8 text-sm  transition duration-300 "
            onClick={handleAddToCart}
          >
            Add
          </button>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default Item;