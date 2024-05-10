import React from "react";
import { GoSearch } from "react-icons/go";
import SortDropdown from "./SortDropdown";

function SearchInput({ searchTerm, setSearchTerm, sortOption, setSortOption }) {
  
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center md:mb-[2rem] ">
      <div className="relative w-full sm:w-[70%]">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <GoSearch className="text-[#125872] text-xl" />
        </span>
        <input 
          id="searchInput"
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="pl-10 pr-4 py-4 w-full shadow-md rounded-md border-[1px] border-[#125872] focus:outline-none mb-2 sm:mb-0 sm:mr-4" 
        />
      </div>
      <div className="hidden md:block ml-[1rem] shadow-md">
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>
    </div>
  );
}

export default SearchInput;
