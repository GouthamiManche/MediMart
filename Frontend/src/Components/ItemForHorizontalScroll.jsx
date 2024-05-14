import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

function ItemForHorizontalScroll({ item }) {
  const [isItemInCart, setIsItemInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item) {
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
    }
  }, [item?._id]);

  const truncatedName = truncateString(item?.Medicine_Name || item.Name, 16);
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
    if (item) {
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
    }
  };

  return (
    <div>
    <div className="bg-white m-2 p-2 rounded-xl border border-gray-200 flex flex-col md:w-[16rem] md:h-[22rem] w-[12.6rem] h-[15.4rem] overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <Link
        to={`/${item.Sub_Category}/${item.Name}`}
        state={item}
              >
        <div className="relative h-40 md:h-56 overflow-hidden rounded-lg flex items-center justify-center">
          <img
            src={item.Image_URL}
            alt={item?.Medicine_Name || item.Name}
            className="max-w-full max-h-full transition duration-300 hover:scale-105"
          />
        </div>
        </Link>
        <hr className="border border-gray-300 " />
        <div className="flex flex-col justify-between md:mt-6 relative">
        <Link
        to={`/${item.Sub_Category}/${item.Name}`}
        state={item}
              >
          <h3 className="font-semibold md:text-lg text-md text-[#171A1FFF] transition duration-300 hover:text-[#3EBDE0FF]">
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
              <div className="flex items-center font-semi-bold border border-[#125872] border rounded-md px-4 py-1 shadow-md">
                <button
                  className="text-[#125872]"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </button>
                <span className="mx-4 text-[#125872]">{quantity}</span>
                <button
                  className="text-[#125872]"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="flex items-center justify-center text-white rounded-md font-bold border py-1.5 px-8 text-sm bg-[#125872] transition duration-300 shadow-md"
                onClick={handleAddToCart}
              >
                Add
              </button>
            )}
          </div>
        </div>

    </div>
    </div>
  );
}

export default ItemForHorizontalScroll;