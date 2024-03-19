const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const fs = require("fs");
const fastcsv = require("fast-csv");

const app=express()
app.use(cors())

let stream = fs.createReadStream("Medicine_Details.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

// create a new connection to the database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "medicinedb"
  });

  // open the connection
  connection.connect(error => {
    if (error) {
      console.error('Connection error: ', error);
    } else {
      let query =
        "INSERT INTO Details (MedicineName, Composition, Uses, SideEffects, ImageURL, Manufacturer) VALUES ?";
      connection.query(query, [csvData], (error, response) => {
        console.log(error || response);
      });
    }
  });
  });

stream.pipe(csvStream);

app.listen(8082,()=>{
    console.log("listening");
})