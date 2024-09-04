const express = require("express");
const bcryptjs = require("bcryptjs");
const morgan = require("morgan");
const { MongoClient } = require("mongodb");
const blogRoutes = require('./routes/blogRoutes');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(bodyParser.json())

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "bloggDatabase";

// routes
// app.get('/', (req, res) => {
//   res.redirect('/blogs');
// });

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use(blogRoutes)

// app.listen(4000);
mongoose.connect(url)
  .then(result => app.listen(4000))
  .catch(err => console.log(err));

