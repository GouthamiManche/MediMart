// SearchBar.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchInput from "./SearchInput";
import Item from "./Item";
import Pagination from "./Pagination";

function SearchBar({ pg }) {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [visibleRange, setVisibleRange] = useState([1, 4]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/data", {
          headers: {
            apikey: "123",
          },
        });
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
          console.error("Authorization error: You are not authorized to access this resource.");
        } else {
          console.error("Error fetching data:", error.message);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (val.Medicine_Name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    });
    setFilteredData(filtered);
    setCurrentPage(1);
    updateVisibleRange(1);
  }, [searchTerm, data]);

  useEffect(() => {
    const handleBackNavigation = () => {
      setCurrentPage(1);
      updateVisibleRange(1);
      window.history.replaceState(null, null, `${location.pathname}`);
    };

    window.addEventListener("popstate", handleBackNavigation);
    return () => window.removeEventListener("popstate", handleBackNavigation);
  }, [location.pathname]);

  useEffect(() => {
    const initialPage = parseInt(pg || "1", 10);
    setCurrentPage(initialPage);
    updateVisibleRange(initialPage);
  }, [pg]);

  useEffect(() => {
    // Update the URL to pg=1 whenever the component mounts or refreshes
    window.history.replaceState(null, null, `${location.pathname}`);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginateNext = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    updateVisibleRange(nextPage);
    window.history.pushState({ currentPage: nextPage }, null, `${location.pathname}?pg-${nextPage}`);
  };

  const paginatePrev = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    updateVisibleRange(prevPage);
    window.history.pushState({ currentPage: prevPage }, null, `${location.pathname}?pg-${prevPage}`);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateVisibleRange(pageNumber);
    window.history.pushState({ currentPage: pageNumber }, null, `${location.pathname}?pg-${pageNumber}`);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = visibleRange[0]; i <= visibleRange[1] && i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const updateVisibleRange = (pageNumber) => {
    const start = Math.max(1, pageNumber - 3);
    const end = Math.min(totalPages, start + 3);
    setVisibleRange([start, end]);
  };

  return (
    <div className="bg-white py-10 px-4">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex flex-wrap justify-center">
        {currentItems.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginatePrev={paginatePrev}
        paginateNext={paginateNext}
        goToPage={goToPage}
        getPageNumbers={getPageNumbers}
      />
    </div>
  );
}

export default SearchBar;
