import React from "react";
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
  //console.log(ItemForHorizontalScroll,"itemscroll");
  const truncatedName = truncateString(ItemForHorizontalScroll.Medicine_Name || ItemForHorizontalScroll.Name, 20);
  const { detail, detailLabel } = getItemDetails(ItemForHorizontalScroll);

  return (
    
    <div>
      <Link
        to={`/${ItemForHorizontalScroll.Sub_Category}/${ItemForHorizontalScroll.Name}`}
        state={ItemForHorizontalScroll}
        className="bg-white m-2 p-2 rounded-xl shadow-md flex flex-col md:w-[16rem] md:h-[22rem] w-[12.4rem] h-[14rem]  overflow-hidden hover:shadow-xl transition duration-300"
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
            <button className="flex items-center justify-center  text-white rounded-md font-bold border  py-1.5 px-8 text-sm  bg-[#125872] transition duration-300">
             Add
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ItemForHorizontalScroll;
