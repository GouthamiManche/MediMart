import React from "react";
import { CgSortAz } from "react-icons/cg";

const SortDropdown = ({ sortOption, setSortOption }) => {
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  return (
    <div className="w-full sm:w-auto">
      <div className="relative">
        <select
          id="sortOptions"
         // value={sortOption}
         value=""
          onChange={handleSortChange}
          className="appearance-none bg-black text-white px-4 sm:pl-10 py-2 sm:py-4 rounded w-full focus:outline-none transition duration-300 flex justify-between items-center hover:bg-gray-900"
        >
          <option value="">Sort by</option>
          <option value="priceLowToHigh">Price: Low-High</option>
          <option value="priceHighToLow">Price: High-Low</option>
          <option value="nameAscending">A-Z</option>
          <option value="nameDescending">Z-A</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-8 text-white">
          <CgSortAz className="text-2xl sm:text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
