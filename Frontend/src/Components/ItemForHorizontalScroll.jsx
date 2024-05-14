import React, { useState, useEffect, useContext, useMemo } from "react";
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
  const { user } = useContext(AuthContext);
  const [isItemInCart, setIsItemInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Memoize the Product_id value
  const productId = useMemo(() => item.Product_id, [item.Product_id]);

  useEffect(() => {
    async function loadQuantity() {
      if (!productId) {
        console.warn("Item doesn't have a valid Product_id");
        return;
      }

      try {
        const response = await axios.get(
          `https://medicine-website-two.vercel.app/api/cart/${productId}`
        );
        if (response.data && response.data.quantity) {
          setQuantity(response.data.quantity);
          setIsItemInCart(true);
        }
      } catch (error) {
        console.error("Error loading quantity:", error);
      }
    }

    // Call loadQuantity only if productId exists
    if (productId) {
      loadQuantity();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to the cart");
      navigate("/login");
      return;
    }

    try {
      
      // Optimistically update UI
      setIsItemInCart(true);

      const res = await axios.post(
        "https://medicine-website-two.vercel.app/api/addtocart",
        {
          Name: item.Name,
          Price: item.Price,
          Image_URL: item.Image_URL,
          quantity: quantity,
          Product_id: productId,
          email: user.email,
        }
      );
      if (res.status === 201) {
        // No need to update UI, it's already updated optimistically
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setIsItemInCart(false); // Revert UI update on error
      setError("Error adding item to cart");
    }
  };

  const removeFromCart = async () => {
    try {
      // Optimistically update UI
      setIsItemInCart(false);

      await axios.delete(
        `https://medicine-website-two.vercel.app/api/removefromcart/${productId}`,
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
      setIsItemInCart(true); // Revert UI update on error
      setError("Error removing item from cart");
    }
  };

  const handleQuantityChange = async (value) => {
    const newQuantity = Math.max(1, value); // Ensure minimum quantity is 1
    setQuantity(newQuantity);

    if (newQuantity === 1) {
      removeFromCart(); // Remove item from cart if quantity is 1
    } else {
      try {
        const res = await axios.put(
          `https://medicine-website-two.vercel.app/api/updatecart/${productId}`,
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

  const truncatedName = truncateString(item?.Medicine_Name || item.Name, 16);
  const { detail, detailLabel } = getItemDetails(item);

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
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default ItemForHorizontalScroll;