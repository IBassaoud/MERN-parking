const { log } = require('console');
const express = require('express');
const fs = require('fs');

// Constants
const PORT = 80;
const HOST = "127.0.0.1";

const dotenv = require('dotenv').config();

// DB
const MongoClient = require('mongodb').MongoClient
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;

// App
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

// CRUD OPERATIONS
// Insert one document
//########## PARKINGS - INSERTION | EDIT ##########
app.post("/create", function (req, res) {
    console.log("Insert one : ",req.body);
    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        const body = req.body;
        var dbo = database.db("db_parking");
        var myobj = {
            name: body.name,
            type: body.type,
            city: body.city,
        };
        dbo.collection("parking").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            database.close();
        });
    });
    res.redirect(`http://${HOST}:${PORT}`)
})


//########## PARKINGS - READ ##########
// Show all parkings
app.get("/parking", function (req, res) {
    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var dbo = database.db("db_parking");
        dbo.collection("parking").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
            console.log(result);
            database.close();
        });
    });
})

// Show one document
app.get("/parking/:id", function (req, res) {
    let ObjectId = require('mongodb').ObjectId;
    const id_parking = new ObjectId(req.params.id);
    const query = { _id : id_parking };
    console.log(id_parking);
    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var dbo = database.db("db_parking");
        dbo.collection("parking").find( query ).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
            console.log(result);
            database.close();
        })
        });
    });


app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('index.html', function (err, data) {
        if (err) throw err;
        res.end(data);
    });
});

app.get('/login', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('views/Auth/login.html', function (err, data) {
        if (err) throw err;
        res.end(data);
    });
});


app.listen(PORT, HOST);
console.log(`App is running on http://${HOST}:${PORT}`);
