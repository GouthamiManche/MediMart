import React, { useState } from "react";

function FilterBar({ selectedCategory, categories, handleCategoryFilter, resetFilters }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="">

      <button
        className="md:hidden  ml-[2rem] z-10 bg-black text-white px-[2rem] py-2 rounded-md shadow-lg"
        onClick={togglePopup}
      >
        Filter
      </button>


      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">Filter by Category</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={togglePopup}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
            <ul className="space-y-2">
              <li
                className={`cursor-pointer text-gray-800 hover:text-blue-600  transition duration-300 ${
                  selectedCategory === "" ? "font-semibold" : ""
                }`}
                onClick={resetFilters}
              >
                All
              </li>
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer  text-gray-800 hover:text-blue-600 transition duration-300 ${
                    selectedCategory === category ? "font-semibold" : ""
                  }`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            </div>
          </div>
        </div>
      )}


      <span className="hidden md:block bg-gray-100 p-4 rounded-lg md:ml-[1rem] md:w-[16rem] shadow-lg">
        <span className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl">Filter by Category</h2>
        </span>
        <ul className="space-y-3">
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
      </span>



    </div>
  );
}

export default FilterBar;