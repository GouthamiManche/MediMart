import React, { useEffect ,useState} from "react";
import { Link } from "react-router-dom";
function truncateString(str, num) {
  if (!str || str.length === 0)
    return "";
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
  
  const product = location.state;
  const [quantity, setQuantity] = useState(1);
  const truncatedName = truncateString(item.Medicine_Name || item.Name, 20);
  const { detail, detailLabel } = getItemDetails(item);
// console.log(item.Medicine_Name)
// console.log(item.Name)
// console.log()

const handleAddToCart = (product, quantity) => {
  const { _id, Name, Price, Image_URL, Product_id } = product;
  const cartItem = {
    _id,
    Name,
    Price,
    Image_URL,
    quantity,
    Product_id
  };
  const updatedCartItems = [...cartItems, cartItem];
  setCartItems(updatedCartItems);
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  setItemAddedToCart(true); // Set the state to indicate item added to cart
  toast.success('Item Added To Cart', { autoClose: 2000 });
};

  return (
    <>
    <div className="bg-white m-2 p-4 rounded-xl border border-gray-200   flex flex-col md:w-[16rem] w-[16rem] md:h-[22rem] h-[22rem] overflow-hidden hover:shadow-xl transition duration-300">
       <Link
        to={`/${item.Sub_Category}/${item.Name}`}
        state={item}
         >
        <div className="relative h-56 overflow-hidden rounded-lg flex items-center justify-center">
          <img
            src={item.Image_URL}
            alt={item.Medicine_Name || item.Name}
            className="max-w-full max-h-full transition duration-300 hover:scale-105"
          />
        </div>
        </Link>
        <hr className="border border-gray-300 " />
        <Link
        to={`/${item.Sub_Category}/${item.Name}`}
        state={item}
         >
        <div className="flex flex-col justify-between mt-6 relative">
          <h3 className="font-semibold text-lg text-[#171A1FFF]transition duration-300 hover:text-[#3EBDE0FF]">
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
            <button onClick={() => handleAddToCart(product, quantity)} className="flex items-center justify-center  text-white rounded-md font-bold border  py-1.5 px-8 text-sm  bg-[#125872] transition duration-300">
             Add
            </button>
          </div>
        </div>
 </>
  
  );
}

export default Item;