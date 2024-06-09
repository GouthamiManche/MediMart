import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function getItemDetails(item) {
  switch (item.Category) {
    case "Supplements":
      return { detail: item.Description, detailLabel: "Description" };
    case "Capsules":
      return { detail: item.Composition, detailLabel: "Composition" };
    default:
      return { detail: "", detailLabel: "" };
  }
}

function ItemForHorizontalScrollCart({ item }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isItemInCart, setIsItemInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const truncatedName = truncateString(item?.Medicine_Name || item.Name, 16);
  const { detail, detailLabel } = getItemDetails(item);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const reloadPage = useCallback(debounce(() => {
    window.location.reload();
  }, 1000), []);

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
        setTimeout(reloadPage, 1000); // Delayed reload after 1 second
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error('Failed to add item to cart', { autoClose: 2000 });
    }
  };
  const removeFromCart = async () => {
    try {
      await axios.delete(
        `https://medicine-website-two.vercel.app/api/removefromcart/${item.Product_id}`
      );
      setIsItemInCart(false);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleQuantityChange = async (value) => {
    const newQuantity = Math.max(1, value);
    setQuantity(newQuantity);

    if (newQuantity === 1) {
      removeFromCart();
    }

    try {
      const res = await axios.put(
        `https://medicine-website-two.vercel.app/api/updatecart/${item.Product_id}`,
        {
          quantity: newQuantity,
        }
      );
      if (res.status !== 200) {
        setError("Error updating item quantity");
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <div className="bg-white m-2 p-4 rounded-xl border border-gray-200 hover:border-[#125872] flex flex-col md:w-[16rem] md:h-[22rem] w-[12.6rem] h-[16.4rem] overflow-hidden  transition duration-300">
        <Link
          to={`/${item.Sub_Category}/${item.Name}`}
          state={item}
        >
          <div className="relative h-40 md:h-56 overflow-hidden rounded-lg flex items-center justify-center">
            <img
              src={item.Image_URL}
              alt={item?.Medicine_Name || item.Name}
              className="max-w-full max-h-full"
            />
          </div>
        </Link>
        <hr className="border border-gray-300" />
        <div className="flex flex-col justify-between md:mt-6 relative">
          <Link
            to={`/${item.Sub_Category}/${item.Name}`}
            state={item}
          >
            <h3 className="font-semibold md:text-lg text-md text-[#125872]">
              {truncatedName}
            </h3>
          </Link>
          {detail && (
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-semibold">{detailLabel}: </span>
              {detail}
            </p>
          )}
          <div className="flex justify-between items-center mt-[0.5rem] md:mt-2">
            <h3 className="md:text-2xl text-lg font-bold text-[#323743FF]">
              ₹{item.Price}
            </h3>
            {isItemInCart ? (
              <div className="flex items-center font-semi-bold bg-[#125872] rounded-md px-4 py-1 shadow-md">
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
                className="flex items-center justify-center bg-[#12587222] border-[#125872]  text-[#125872] rounded-md font-bold border py-1.5 px-8 text-sm  transition duration-300 shadow-md"
                onClick={handleAddToCart}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default ItemForHorizontalScrollCart;