import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Item from "../Components/Item";
import Navbar from "../Components/Navbar";

function Categoryshop() {
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');
  const page = searchParams.get('pg');

  console.log(category); // Add this line to check the category

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/data?sub_category=${category}`, {
          headers: {
            apikey: '123',
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div>
        <div>
      <Navbar />
      <h1>{category} Products</h1>
      <div className="flex flex-wrap">
        {products.map((product, index) => (
          <Item key={index} item={product} />
        ))}
      </div>
    </div>

    </div>
  )
}

export default Categoryshop
