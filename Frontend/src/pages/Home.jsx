import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeImage from "../Components/HomeImage";
import OurProduct from "../Components/OurProduct";
import DynamicBanner from "../Components/DynamicBanner";
import HomeCarousel from "../Components/HomeCarousel";
import HomeImageBottom from "../Components/HomeImageBottom";
import HorizontalCardScroll from "../Components/HorizontalCardScroll";
import LoadingGif from "../Components/LoadingGif"; 

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        console.log(apiUrl)
        const response = await axios.get(`${apiUrl}/products?category=Other`, {
          headers: {
            apikey: apiKey,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false); // Set loading to false after fetching (even on errors)
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <HomeImage />
      <OurProduct />
      {isLoading ? (
        <LoadingGif />
      ) : (
        <HorizontalCardScroll itemForHorizontalScroll={items} />
      )}
      <DynamicBanner />
      <HomeCarousel />
      <HomeImageBottom />
    </div>
  );
}

export default Home;
