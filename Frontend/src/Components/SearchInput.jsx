import React from "react";
import SortDropdown from "./SortDropdown";

function SearchInput({ searchTerm, setSearchTerm, sortOption, setSortOption }) {
  return (
    <div className="flex flex-col sm:flex-row justify-center mb-6">
      <input
        id="searchInput"
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="px-4 py-3 w-full sm:w-[60%] rounded border-2 border-black focus:outline-none mb-2 sm:mb-0 sm:mr-2"
      />
      <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
    </div>
  );
}

export default SearchInput;