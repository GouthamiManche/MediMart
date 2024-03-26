import React, { useState } from "react";
import data from '../json/pharmacy.dataset.json';
import { Link } from 'react-router-dom';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [visibleRange, setVisibleRange] = useState([1, 5]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);


  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage === visibleRange[1]) {
      setVisibleRange([visibleRange[0] + 1, visibleRange[1] + 1]);
    }
  };

  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage === visibleRange[0]) {
      setVisibleRange([visibleRange[0] - 1, visibleRange[1] - 1]);
    }
  };

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = visibleRange[0]; i <= visibleRange[1] && i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };



  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="flex justify-center mb-6">
        <input
          id="searchInput"
          type="text"
          placeholder="Search here..."
          onChange={(event) => setSearchTerm(event.target.value)}
          className="px-4 py-3 w-[60%] rounded-md border-2 border-black transition duration-300 ease-in-out hover:border-blue-500"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {currentItems
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.Medicine_Name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val) => {
            return (
              <Link
                key={val._id.$oid}
                to={`/singleproduct/${val._id.$oid}`}
                state={val}
                
                className="bg-white m-6 p-4 rounded-md border border-black shadow-md flex flex-col items-center w-[16rem] h-[22rem] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg hover:border-blue-500"
              >
                <img src={val.Image_URL} alt="" className="h-64" />
                <h3 className="text-base font-bold mt-4">{val.Medicine_Name}</h3>
              </Link>
            );
          })}
      </div>
      <div className="flex justify-center mt-6">
        {currentPage > 1 && (
          <button
            className="bg-black text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md mr-1 sm:mr-4"
            onClick={paginatePrev}
          >
            Prev
          </button>
        )}
        <div className="overflow-hidden">
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              className={`mx-1 px-2 py-1 sm:mx-2 sm:px-4 sm:py-2 rounded-md ${
                pageNumber === currentPage
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700"
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
    </div>
  );
}

export default SearchBar;
