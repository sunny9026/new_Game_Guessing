const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB setup
mongoose.connect('mongodb://localhost/auth/ReactUserDB');

//app setup
app.use(morgan('combined'));
//app.use(bodyParser.json({type : '*/*'})); now depricated in express version 4 onwards.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({type : '*/*'}));

app.use(cors());

router(app);

//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on port :", port);