import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import SortDropdown from "./SortDropdown";

const SearchInput = ({ searchTerm, setSearchTerm, sortOption, setSortOption }) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "LOTION",
    "SHAMPOO",
    "SOAP",
    "SPRAYS",
    "SYRUP",
    "TABLET",
    "BABY CARE",
    "PERSONAL CARE",
    "WOMEN CARE",
    "SUPPLEMENTS",
    "SKIN CARE"
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % placeholders.length;
        setCurrentPlaceholder(placeholders[newIndex]);
        return newIndex;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center md:mb-[2rem]">
      <div className="relative w-full sm:w-[70%]">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <GoSearch className="text-[#125872] text-xl" />
          </span>
          <input
            id="searchInput"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="pr-4 py-4 w-full shadow-md rounded-md border-[1px] border-[#125872] focus:outline-none mb-2 sm:mb-0 sm:mr-4 transition-all duration-500 ease-in-out pl-12"
          />
          {!searchTerm && (
            <span className="absolute left-8 top-0 pl-4 py-4 text-gray-400 sm:block hidden">
              Search for{" "}
              <span className="font-semibold text-gray-600">
                {currentPlaceholder}
              </span>
            </span>
          )}
        </div>
      </div>
      <div className="hidden md:block ml-[1rem] shadow-md">
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>
    </div>
  );
};

export default SearchInput;