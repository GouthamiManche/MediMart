import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import HomeImage from "../Components/HomeImage";
import OurProduct from "../Components/OurProduct";
import Footer from "../Components/Footer";
import DynamicBanner from "../Components/DynamicBanner";
import HomeCarousel from "../Components/HomeCarousel";
import HomeImageBottom from "../Components/HomeImageBottom";
import HorizontalCardScroll from "../Components/HorizontalCardScroll";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/cat", {
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
      <Navbar />
      <HomeImage />
      <OurProduct />
      <HorizontalCardScroll itemForHorizontalScroll={items} />
      <DynamicBanner />
      <HomeCarousel />
      <HomeImageBottom />
      <Footer />
    </div>
  );
}

export default Home;
