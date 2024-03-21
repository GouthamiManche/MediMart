import React, { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

 
  const data = [
    { id: 1, title: "Cream", price: 14, image: "/src/Images/Cream.jpeg" },
    { id: 2, title: "Injections", price: 22, image: "/src/Images/Injections.jpg" },
    { id: 3, title: "syrup", price: 30, image: "/src/Images/syrup.jpg" },
    { id: 4, title: "Tablets", price: 18, image: "/src/Images/Tablets.jpeg" },

  ];

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  return (
    <>
      <div className="bg-white py-10">
        <div className="flex justify-center mb-6">
          <input
            id="searchInput"
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="px-4 py-2 w-1/2 rounded-md border-2"
          />
          <button
            onClick={handleSearch}
            className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md ml-2"
          >
            Search
          </button>
        </div>
        <div className="flex flex-wrap justify-center">
          {data
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((val) => {
              return (
                <div
                  className="bg-white m-6 p-4 rounded-md shadow-md"
                  key={val.id}
                >
                  <img src={val.image} alt="" className="h-64 mx-auto" />
                  <h3 className="text-xl font-bold mt-4">{val.title}</h3>
                  <p className="text-gray-600 font-semibold mt-2">${val.price}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default SearchBar;
