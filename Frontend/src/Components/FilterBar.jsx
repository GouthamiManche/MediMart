import React, { useState } from "react";

const SubCategoryItem = ({ subCategory, selectedSubCategory, handleSubCategoryFilter, resetFilters }) => (
  <li
    className={`cursor-pointer text-gray-800 hover:text-blue-600 transition duration-300 ${
      selectedSubCategory === subCategory ? "font-semibold" : ""
    }`}
    onClick={() => handleSubCategoryFilter(subCategory)}
  >
    <input
      type="checkbox"
      className="mr-2"
      checked={selectedSubCategory === subCategory}
      onChange={() => handleSubCategoryFilter(subCategory)}
    />
    {subCategory}
  </li>
);

function FilterBar({ selectedSubCategory, subCategories, handleSubCategoryFilter, resetFilters }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="relative">
      <button className="md:hidden ml-8 z-10 bg-black text-white px-8 py-2 rounded-md shadow-lg" onClick={togglePopup}>
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
                    selectedSubCategory === "" ? "font-semibold" : ""
                  }`}
                  onClick={resetFilters}
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedSubCategory === ""}
                    onChange={resetFilters}
                  />
                  All
                </li>
                {subCategories.map((subCategory) => (
                  <SubCategoryItem
                    key={subCategory}
                    subCategory={subCategory}
                    selectedSubCategory={selectedSubCategory}
                    handleSubCategoryFilter={handleSubCategoryFilter}
                    resetFilters={resetFilters}
                  />
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
              selectedSubCategory === "" ? "font-semibold" : ""
            }`}
            onClick={resetFilters}
          >
            <input
              type="checkbox"
              className="mr-2 rounded-full "
              checked={selectedSubCategory === ""}
              onChange={resetFilters}
            />
            All
          </li>
          {subCategories.map((subCategory) => (
            <SubCategoryItem
              key={subCategory}
              subCategory={subCategory}
              selectedSubCategory={selectedSubCategory}
              handleSubCategoryFilter={handleSubCategoryFilter}
              resetFilters={resetFilters}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterBar;
