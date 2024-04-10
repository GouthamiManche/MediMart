import React from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

function truncateString(str, num) {
  if (!str || str.length === 0)
    return "";
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

function getItemDetails(item) {
  // Define logic to retrieve item details based on its category
  switch (item.Category) {
    case "Supplements":
      return { detail: item.Description, detailLabel: "Description" };
    case "Capsules":
      return { detail: item.Composition, detailLabel: "Composition" };
    // Add cases for other categories as needed
    default:
      return { detail: "", detailLabel: "" };
  }
}

function ItemForHorizontalScroll({ ItemForHorizontalScroll }) {
  const truncatedName = truncateString(ItemForHorizontalScroll.Medicine_Name || ItemForHorizontalScroll.Name, 20);
  const { detail, detailLabel } = getItemDetails(ItemForHorizontalScroll);

  return (
    <div>
      <Link
        to={`/singleproduct/${ItemForHorizontalScroll.Category && ItemForHorizontalScroll._id}`}
        state={ItemForHorizontalScroll}
        className="bg-white m-2 p-2 rounded-2xl shadow-md flex flex-col md:w-[15rem] md:h-[20rem] w-[12.4rem] h-[14rem]  overflow-hidden hover:shadow-xl transition duration-300"
      >
        <div className="relative h-56 overflow-hidden rounded-lg flex items-center justify-center">
          <img
            src={ItemForHorizontalScroll.Image_URL}
            alt={ItemForHorizontalScroll.Medicine_Name || ItemForHorizontalScroll.Name}
            className="max-w-full max-h-full transition duration-300 hover:scale-105"
          />
        </div>
        <hr className="border border-gray-300 " />
        <div className="flex flex-col justify-between md:mt-6  relative">
          <h3 className="font-semibold md:text-lg text-md text-[#171A1FFF]transition duration-300 hover:text-[#3EBDE0FF]">
            {truncatedName}
          </h3>
          {detail && (
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-semibold">{detailLabel}: </span>
              {detail}
            </p>
          )}
          <div className="flex justify-between items-center md:mt-2">
            <h3 className="md:text-2xl text-lg font-bold text-[#323743FF]">₹{ItemForHorizontalScroll.Price}</h3>
            <button className="flex items-center justify-center bg-white text-[#3EBDE0FF] rounded-full border border-[#3EBDE0FF] py-2 px-2 text-sm hover:bg-[#3EBDE0FF] hover:text-white transition duration-300">
              <BsCart3 className="text-lg mr-1" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ItemForHorizontalScroll;
