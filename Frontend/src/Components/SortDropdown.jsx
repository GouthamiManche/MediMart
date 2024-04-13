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
          value=""
          onChange={handleSortChange}
          className="appearance-none bg-[#125872] text-white md:px-4 px-2  md:py-4 py-3 rounded-md md:w-full focus:outline-none transition duration-300 flex justify-between items-center hover:bg-gray-900 text-sm sm:text-base md:ml-[1px] ml-[0.5rem] text-[16px]"
        >
          <option value="">Sort by</option>
          <option value="priceLowToHigh">Price: Low-High</option>
          <option value="priceHighToLow">Price: High-Low</option>
          <option value="nameAscending">A-Z</option>
          <option value="nameDescending">Z-A</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-8 text-white">
          <CgSortAz className="hidden md:block text-lg sm:text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;