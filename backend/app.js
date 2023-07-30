const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser")
const app = express();



app.use(express.json());
app.use(cookieParser());


//Import all routes
const auth = require('./routes/authRoutes');
const projects = require('./routes/projectRoutes');


app.use('/', auth);
app.use('/', projects);


app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app
