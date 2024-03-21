import React, { useState, useEffect } from 'react';
import axios from 'axios'

function DataCards() {
    const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    <div>DataCards</div>
    <div className="data-cards-container">
      {data.map((item) => (
        <div className="data-card" key={item._id}>
          <h3>{item.Medicine_Name}</h3>
          <p>{item.Composition}</p>
          <p>{item.Uses}</p>
        </div>
      ))}
    </div>
    </>
  )
}

export default DataCards