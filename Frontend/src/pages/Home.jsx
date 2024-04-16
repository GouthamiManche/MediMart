import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeImage from "../../Components/HomeImage";
import OurProduct from "../../Components/OurProduct";
import DynamicBanner from "../../Components/DynamicBanner";
import HomeCarousel from "../../Components/HomeCarousel";
import HomeImageBottom from "../../Components/HomeImageBottom";
import HorizontalCardScroll from "../Components/HorizontalCardScroll";
function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://medicine-website-two.vercel.app/api/products?category=Other", {
          headers: {
            apikey: "123",
          },
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div >

      <HomeImage />
      <OurProduct />
      <HorizontalCardScroll itemForHorizontalScroll={items} />
      <DynamicBanner />
      <HomeCarousel />
      <HomeImageBottom />

    </div>
  );
}

export default Home;
