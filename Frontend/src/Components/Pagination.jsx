import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
function Pagination({ currentPage, totalPages, paginatePrev, paginateNext, goToPage, getPageNumbers }) {
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-6 pb-[2rem]">
      {currentPage > 1 && (
        <button
          className=" text-gray-800 text-2xl px-2 py-1 sm:px-4 sm:py-2 rounded-md mr-1 sm:mr-4"
          onClick={paginatePrev}
        >
        <IoIosArrowBack />
        </button>
      )}
      <div className="overflow-hidden">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`mx-1 px-2 py-1 sm:mx-2 sm:px-4 sm:py-2 rounded-full  ${
              pageNumber === currentPage ? "text-[#125872] border border-[#125872]" : "bg-transparent text-gray-700"
            }`}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      {currentPage < totalPages && (
        <button
          className=" text-gray-800 text-2xl ml-1 sm:ml-4 px-2 py-1 sm:px-4 sm:py-2 rounded-md"
          onClick={paginateNext}
        >
       <IoIosArrowForward />
        </button>
      )}
    </div>
  );
}

export default Pagination;
