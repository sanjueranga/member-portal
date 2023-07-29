const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser")
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Import all routes
const auth = require('./routes/authRoutes');
const projects = require('./routes/projectRoutes');


app.use('/', auth);
app.use('/', projects);


app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app
