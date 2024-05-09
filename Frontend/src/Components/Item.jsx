import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMinus } from "react-icons/fi";

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

function Item({ item }) {
  const [isItemInCart, setIsItemInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      const existingItem = cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        setQuantity(existingItem.quantity);
        setIsItemInCart(true);
      } else {
        setIsItemInCart(false);
      }
    } else {
      setIsItemInCart(false);
    }
  }, [item._id]);

  const truncatedName = truncateString(item.Medicine_Name || item.Name, 20);
  const { detail, detailLabel } = getItemDetails(item);

  const handleAddToCart = () => {
    setIsItemInCart(true);
    setQuantity(1);
    updateCartItem(1);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(0, value);
    setQuantity(newQuantity);

    if (newQuantity === 0) {
      removeFromCart();
    } else {
      updateCartItem(newQuantity);
    }
  };

  const removeFromCart = () => {
    const storedCartItems = localStorage.getItem('cartItems');
    let updatedCartItems;

    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      updatedCartItems = cartItems.filter(
        (cartItem) => cartItem._id !== item._id
      );
    } else {
      updatedCartItems = [];
    }

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setIsItemInCart(false);
  };

  const updateCartItem = (newQuantity) => {
    const { _id, Name, Price, Image_URL, Product_id } = item;
    const cartItem = {
      _id,
      Name,
      Price,
      Image_URL,
      quantity: newQuantity,
      Product_id,
    };

    const storedCartItems = localStorage.getItem('cartItems');
    let updatedCartItems;

    if (storedCartItems) {
      const cartItems = JSON.parse(storedCartItems);
      const existingItemIndex = cartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity = newQuantity;
        updatedCartItems = cartItems;
      } else {
        updatedCartItems = [...cartItems, cartItem];
      }
    } else {
      updatedCartItems = [cartItem];
    }

    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };


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
      {detail && (
        <p className="text-sm text-gray-600 mt-2">
          <span className="font-semibold">{detailLabel}: </span>
          {detail}
        </p>
      )}
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
    </div>
  );
}

export default Item;