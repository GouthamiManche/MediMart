import React from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

function Item({ item }) {
  const truncatedName = truncateString(item.Medicine_Name, 20);
  return (
    <div className="">
      <Link
        to={`/singleproduct/${item._id.$oid}`}
        state={item}
        className="bg-white m-4 p-4 rounded-md shadow-md flex flex-col w-[16rem] h-[22rem] overflow-hidden hover:shadow-xl transition duration-300"
      >
        <div className="relative h-56 overflow-hidden rounded-md flex items-center justify-center">
          <img
            src={item.Image_URL}
            alt={item.Medicine_Name}
            className="max-w-full max-h-full transition duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between mt-6 relative">
          <h3 className="font-semibold text-lg text-[#171A1FFF]transition duration-300 hover:text-[#3EBDE0FF]">
            {truncatedName}
          </h3>
          <div className="flex justify-between items-center mt-10">
            <h3 className="text-2xl font-bold text-[#323743FF]">₹{item.Price}</h3>
            <button className="flex items-center justify-center bg-white text-[#3EBDE0FF] rounded-full border border-[#3EBDE0FF] py-2 px-2 text-sm hover:bg-[#3EBDE0FF] hover:text-white transition duration-300">
              <BsCart3 className="text-lg mr-1" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Item;