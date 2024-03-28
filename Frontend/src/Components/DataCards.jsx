import React, { useState, useEffect } from 'react';
import axios from 'axios'

function DataCards() {
    const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data',{
          headers:{
            'apikey':'123'
          }
        });
        setData(response.data);
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
  return (
    <>
    <div>DataCards</div>
    <div className="data-cards-container">
      {data.map((item) => (
        <div className="data-card" key={item._id}>
          <h3>{item.Medicine_Name}</h3>
          <p>{item.Composition}</p>
          <p>{item.Uses}</p>
          <img src={item.Image_URL}></img>
        </div>
      ))}
    </div>
    </>
  )
}

export default DataCards