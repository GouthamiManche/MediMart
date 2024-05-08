import React, { useState } from "react";
import SortDropdown from "./SortDropdown";

const SubCategoryItem = ({
  subCategory,
  selectedSubCategory,
  handleSubCategoryFilter,
  resetFilters,
}) => (
  <li
    className={`cursor-pointer flex items-center ${
      selectedSubCategory === subCategory ? "font-semibold" : "text-gray-800"
    }`}
    onClick={() => handleSubCategoryFilter(subCategory)}
  >
    <div
      className={`mr-2 rounded-full w-5 h-5 flex justify-center items-center border ${
        selectedSubCategory === subCategory
          ? "bg-[#125872] border-[#125872] "
          : "border-gray-400"
      }`}
    >
      {selectedSubCategory === subCategory && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
    </div>
    {subCategory}
  </li>
);

function FilterBar({
  selectedSubCategory,
  subCategories,
  handleSubCategoryFilter,
  resetFilters,
  sortOption,
  setSortOption,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="relative sticky top-20 z-44">
      <div className="ml-[3.5rem] flex items-center mb-4">
        <button
          className="block md:hidden bg-[#125872] text-white px-6 py-[10px] rounded-md text-center flex items-center"
          onClick={togglePopup}
        >
          <i className="fas fa-filter mr-2"></i> Filter
        </button>
        <div className="md:hidden items-center">
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 w-[54%] bg-opacity-50 z-20 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">Category</h2>
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
                  />
                </svg>
              </button>
            </div>
            <div className="max-h-[400px] overflow-auto custom-scrollbar">
              <ul className="space-y-1">
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

      <div className="hidden md:block bg-white p-4 rounded-md ml-4 w-64 shadow-lg border border-gray-300 max-h-[500px] overflow-auto custom-scrollbar ">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-300 ">
          <h2 className="font-bold text-xl">Category</h2>
          <button className="text-[#125872] font-semibold mr-[0.5rem]" onClick={resetFilters}>
            Clear
          </button>
        </div>
        <ul className="space-y-3">
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