const express = require('express');

// Constants
const PORT = 80;
const HOST = 'localhost';

const dotenv = require('dotenv').config('./config');

const MongoClient = require('mongodb').MongoClient
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;


// App
const app = express();
app.get('/', (req, res) => {
    res.send('<center><h2 style="color:red;">Hello World from inside the docker container</h2></center>');
});


app.listen(PORT, HOST);
console.log(`App is running on http://${HOST}:${PORT}`);
