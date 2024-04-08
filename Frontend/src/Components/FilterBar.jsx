import React, { useState } from "react";

function FilterBar({ selectedCategory, categories, handleCategoryFilter, resetFilters }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="relative">
      <button
        className="md:hidden ml-8 z-10 bg-black text-white px-8 py-2 rounded-md shadow-lg"
        onClick={togglePopup}
      >
        Filter
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">Category</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={togglePopup}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="max-h-[400px] overflow-auto custom-scrollbar">
              <ul className="space-y-1">
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
          </div>
        </div>
      )}

      <div className="hidden md:block bg-white p-4 rounded-lg ml-4 w-64 shadow-lg border border-gray-300 max-h-[500px] overflow-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-300">
          <h2 className="font-bold text-xl">Category</h2>
        </div>
        <ul className="space-y-3">
          <li
            className={`cursor-pointer text-gray-800 hover:text-blue-600 transition duration-300 flex items-center ${
              selectedCategory === "" ? "font-semibold" : ""
            }`}
            onClick={resetFilters}
          >
            <div
              className={`w-4 h-4 mr-2 rounded border ${
                selectedCategory === "" ? "bg-blue-500 border-blue-500" : "border-gray-400"
              } flex justify-center items-center`}
            >
              {selectedCategory === "" && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            All
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer text-gray-800 hover:text-blue-600 transition duration-300 flex items-center ${
                selectedCategory === category ? "font-semibold" : ""
              }`}
              onClick={() => handleCategoryFilter(category)}
            >
              <div
                className={`w-4 h-4 mr-2 rounded border ${
                  selectedCategory === category ? "bg-blue-500 border-blue-500" : "border-gray-400"
                } flex justify-center items-center`}
              >
                {selectedCategory === category && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {category}
            </li>
          ))}
        </ul>
      </span> */}
      <div className="hidden md:block bg-white p-4 rounded-lg md:ml-[1rem] md:w-[16rem] shadow-lg">
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-bold text-xl">Filter by Category</h2>
  </div>
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
        className={`font-semibold cursor-pointer text-gray-800 hover:text-blue-600 transition duration-300 ${
          selectedCategory === category ? "font-semibold" : ""
        }`}
        onClick={() => handleCategoryFilter(category)}
      >
        <hr className=" border border-black"/>
        {category}
      </li>
    ))}
  </ul>
</div>


    </div>
  );
}

export default FilterBar;