import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../Components/AuthProvider';

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

  useEffect(() => {
    async function preloadCartItems() {
      try {
        const response = await axios.get(
          `https://medicine-website-two.vercel.app/api/cart`
        );
        const cartItems = response.data;
        const cartItem = cartItems.find((cartItem) => cartItem.Product_id === item.Product_id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
          setIsItemInCart(true);
        }
      } catch (error) {
        console.error("Error preloading cart items:", error);
      }
    }

    preloadCartItems();
  }, [item.Product_id]);

  const handleAddToCart = async () => {
    try {
      setIsItemInCart(true);
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
        // No need to update UI, it's already updated optimistically
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setIsItemInCart(false);
      setError("Error adding item to cart");
    }
  };

  const removeFromCart = async () => {
    try {
      setIsItemInCart(false);
      await axios.delete(
        `https://medicine-website-two.vercel.app/api/removefromcart/${item.Product_id}`,
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setIsItemInCart(true);
      setError("Error removing item from cart");
    }
  };

  const handleQuantityChange = async (value) => {
    const newQuantity = Math.max(1, value);
    setQuantity(newQuantity);

    if (newQuantity === 1) {
      removeFromCart();
    } else {
      try {
        const res = await axios.put(
          `https://medicine-website-two.vercel.app/api/updatecart/${item.Product_id}`,
          {
            quantity: newQuantity,
          }
        );
        if (res.status !== 200) {
          // Handle error
        }
      } catch (error) {
        console.error("Error updating item quantity:", error);
        setError("Error updating item quantity");
      }
    }
  };

  const truncatedName = truncateString(item.Medicine_Name || item.Name, 20);

  return (
    <div className="bg-white m-2 p-4 rounded-xl border border-gray-200 flex flex-col md:w-[16rem] w-[16rem] md:h-[22rem] h-[22rem] overflow-hidden shadow-md hover:shadow-xl transition duration-300 ">
      <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
        <div className="relative h-56 overflow-hidden rounded-lg flex items-center justify-center">
          <img
            src={item.Image_URL}
            alt={item.Medicine_Name || item.Name}
            className="max-w-full max-h-full transition duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <hr className="border border-gray-300 " />
      <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
        <div className="flex flex-col justify-between mt-6 relative">
          <h3 className="font-semibold text-lg text-[#171A1FFF] transition duration-300 hover:text-[#3EBDE0FF]">
            {truncatedName}
          </h3>
        </div>
      </Link>
      <div className="flex justify-between items-center mt-2">
        <h3 className="text-2xl font-bold text-[#323743FF]">₹{item.Price}</h3>
        {isItemInCart ? (
          <div className="flex items-center font-semi-bold border border-[#125872] border rounded-md px-4 py-1 shadow-md">
            <button
              className="text-[#125872] "
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              -
            </button>
            <span className="mx-4 text-[#125872]">{quantity}</span>
            <button
              className="text-[#125872] "
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="flex items-center justify-center bg-[#125872] text-white rounded-md font-bold border py-1.5 px-8 text-sm hover:bg-[#0d4456] transition duration-300 shadow-md"
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
