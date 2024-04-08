
import React from "react";

function Pagination({ currentPage, totalPages, paginatePrev, paginateNext, goToPage, getPageNumbers }) {
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-6 pb-[2rem]">
      {currentPage > 1 && (
        <button
          className="bg-black text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md mr-1 sm:mr-4"
          onClick={paginatePrev}
        >
          Prev
        </button>
      )}
      <div className="overflow-hidden">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`mx-1 px-2 py-1 sm:mx-2 sm:px-4 sm:py-2 rounded-md ${
              pageNumber === currentPage ? "bg-black text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => goToPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      {currentPage < totalPages && (
        <button
          className="bg-black text-white ml-1 sm:ml-4 px-2 py-1 sm:px-4 sm:py-2 rounded-md"
          onClick={paginateNext}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
