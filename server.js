const express = require('express');

// Constants
const PORT = 80;
const HOST = 'localhost';

const dotenv = require('dotenv').config();
console.log(process.env.MONGO_USER);

// DB
const MongoClient = require('mongodb').MongoClient
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

// CRUD OPERATIONS
// Add one document
MongoClient.connect(url, function(err, database) {
    if (err) throw err;
    var dbo = database.db("db_parking");
    var myobj = { 
        name: "Parking 1", 
        type: "AIRPORT",
        city: "London",
    };
    dbo.collection("parking").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      database.close();
    });
  });

// App
const app = express();
app.get('/', (req, res) => {
    res.send('<center><h2 style="color:red;">Hello World from inside the docker container</h2></center>');
});


app.listen(PORT, HOST);
console.log(`App is running on http://${HOST}:${PORT}`);
