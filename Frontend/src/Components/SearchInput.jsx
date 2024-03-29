import React from "react";

function SearchInput({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        id="searchInput"
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="px-4 py-3 w-[60%] rounded-md border-2 border-black focus:outline-none focus:border-blue-500 transition duration-300 text-black"
      />
      <button className="ml-2 px-4 py-3 bg-black text-white rounded-md hover:bg-gray-900 focus:outline-none transition duration-300">
        Search
      </button>
    </div>
  );
}

export default SearchInput;
