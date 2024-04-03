import React from "react";

function FilterBar({ selectedCategory, categories, handleCategoryFilter, resetFilters }) {
  return (
    <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto max-h-screen ">
      <h2 className="font-bold text-xl mb-4">Filter by Category</h2>
      <ul className="space-y-2">
        <li
          className={`cursor-pointer text-gray-800 hover:text-blue-600 transition duration-300 ${
            selectedCategory === "" ? "font-semibold" : ""
          }`}
          onClick={resetFilters}
        >
          All
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer text-gray-800 hover:text-blue-600 transition duration-300 ${
              selectedCategory === category ? "font-semibold" : ""
            }`}
            onClick={() => handleCategoryFilter(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterBar;
