
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { BsCart3 } from "react-icons/bs";
function SearchBar() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [visibleRange, setVisibleRange] = useState([1, 4]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data', {
          headers: {
            'apikey':'123'
          }
        });
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
          console.error('Authorization error: You are not authorized to access this resource.');
        } else {
          console.error('Error fetching data:', error.message);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.Medicine_Name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return val;
      }
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchTerm, data]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredData.length;
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
    <div className="bg-white py-10 px-4">

      <div className="flex justify-center mb-6">
      {/* <div class="absolute top-14 left-4 flex items-center font-roboto-slab text-base font-normal bg-white border rounded-md">
        <button class="flex-1 flex items-center justify-center w-80 h-14 text-white bg-black rounded-md cursor-pointer">All Products</button></div> */}
        <input
          id="searchInput"
          type="text"
          placeholder="Search here..."
          onChange={(event) => setSearchTerm(event.target.value)}
          className="px-4 py-3 w-[60%] rounded-md border-2 border-black shadow-md"
        />
      </div>

      <div className="flex flex-wrap justify-center">
        {currentItems.map((val) => {
          return (
            <Link
              key={val._id.$oid}
              to={`/singleproduct/${val._id.$oid}`}
              state={val}
              className="bg-white m-6 p-4 rounded-md shadow-md flex flex-col  w-[16rem] h-[22rem] transition duration-300 ease-in-out transform hover:-translate-y-1 ">
              <div className="flex items-center justify-center">
                <img src={val.Image_URL} alt="" className="h-52" />
              </div>
              <div className=" flex flex-col items-start mt-6">
                <h3 className=" font-bold  h-[2rem]">{val.Medicine_Name}</h3>
              </div>
              <span className="flex   justify-between">
                <h3 className="text-[1.4rem] font-bold mt-[1.8rem]">₹{val.Price}</h3>
                <BsCart3  className="mt-[2rem] text-3xl  text-green-300" />
              </span>
            </Link>
          )
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