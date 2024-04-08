import React from "react";
import SortDropdown from "./SortDropdown";

function SearchInput({ searchTerm, setSearchTerm, sortOption, setSortOption }) {
  
  return (
   
 
    <div className="flex flex-col sm:flex-row justify-center item-center md:mb-[2rem]">
      <input
        id="searchInput"
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="px-4 py-3 w-full sm:w-[70%] rounded border-2 border-black focus:outline-none mb-2 sm:mb-0 sm:mr-2"
      />
      <div className="hidden md:block">
      <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>
    </div>
   
  );
}

export default SearchInput;