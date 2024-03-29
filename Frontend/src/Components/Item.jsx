import React from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

function Item({ item }) {
  return (
    <Link
      to={`/singleproduct/${item._id.$oid}`}
      state={item}
      className="bg-white m-4 p-4 rounded-md shadow-md flex flex-col w-[16rem] h-[20rem] transition duration-300 transform hover:scale-105 hover:shadow-xl"
      style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
    >
      <div className="relative h-56 overflow-hidden rounded-md">
        <img
          src={item.Image_URL}
          alt={item.Medicine_Name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between mt-4">
        <h3 className="font-semibold text-lg text-gray-800">{item.Medicine_Name}</h3>
        <p className="text-sm text-gray-600">{item.Description}</p>
        <div className="flex justify-between items-center mt-2">
          <h3 className="text-lg font-bold text-green-600">₹{item.Price}</h3>
          <button className="flex items-center justify-center bg-green-500 text-white rounded-md py-1 px-2 text-sm hover:bg-green-600 focus:outline-none">
            <BsCart3 className="text-lg mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Item;
