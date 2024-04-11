import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchInput from "./SearchInput";
import Item from "./Item";
import Pagination from "./Pagination";
import FilterBar from "./FilterBar";
import SortDropdown from "./SortDropdown";

function ProductDetail({ pg }) {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [visibleRange, setVisibleRange] = useState([1, 4]);
  const [sortOption, setSortOption] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);

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
        const uniqueSubCategories = [...new Set(response.data.map((item) => item.Sub_Category))];
        setSubCategories(uniqueSubCategories);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (val.Sub_Category && val.Sub_Category.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      });
      const sortedData = sortData(filtered);
      setFilteredData(sortedData);
      setCurrentPage(1);
      updateVisibleRange(1);
    }
  }, [searchTerm, data, sortOption]);

  const sortData = (data) => {
    let sortedData = [...data];
    switch (sortOption) {
      case 'priceLowToHigh':
        sortedData.sort((a, b) => a.Price - b.Price);
        break;
      case 'priceHighToLow':
        sortedData.sort((a, b) => b.Price - a.Price);
        break;
      // case 'averageReviewAscending':
      //   sortedData.sort((a, b) => a.Average_Review - b.Average_Review);
      //   break;
      // case 'averageReviewDescending':
      //   sortedData.sort((a, b) => b.Average_Review - a.Average_Review);
      //   break;
      case 'nameAscending':
        sortedData.sort((a, b) => {
          const aName = a.Name || a.Medicine_Name;
          const bName = b.Name || b.Medicine_Name;
          return aName.localeCompare(bName);
        });
        break;
      case 'nameDescending':
        sortedData.sort((a, b) => {
          const aName = a.Name || a.Medicine_Name;
          const bName = b.Name || b.Medicine_Name;
          return bName.localeCompare(aName);
        });
        break;
      default:
        break;
    }
    return sortedData;
  };

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
    window.history.replaceState(null, null, `${location.pathname}`);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.length > 0 ? filteredData.slice(indexOfFirstItem, indexOfLastItem) : [];
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

  const handleSubCategoryFilter = (subCategory) => {
    setSelectedSubCategory(subCategory);
    const filtered = data.filter((item) => item.Sub_Category === subCategory);
    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setSelectedSubCategory("");
    setFilteredData(data);
  };

  return (
    <div className="">
      <img
        src="src/Images/shopbgimg.jpg"
        alt="Image 1"
        className="w-full h-[50vh] lg:h-[260px] object-cover "
      />
      <div className="mt-9 mx-14">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </div>

      <div className="md:flex space-x-6 flex-">

        <FilterBar
          selectedSubCategory={selectedSubCategory}
          subCategories={subCategories}
          handleSubCategoryFilter={handleSubCategoryFilter}
          resetFilters={resetFilters}
        />
        <div className="md:hidden">
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        </div>
        <div className="flex flex-wrap ">
          {currentItems.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </div>
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

export default ProductDetail;
