'use strict';

//npm modules
const express = require('express');
const morgan = require('morgan');
const Promise = require('bluebird'); //have to configure mongo to use bluebird
const cors = require('cors');
const mongoose = require('mongoose');
const debug = require('debug')('fruit:server');

//app modules
const fruitRouter = require('./route/fruit-route.js');
const locationRouter = require('./route/location-route.js');
const errorMiddleware = require('./lib/error-middleware.js');

//module constants
const PORT = process.env.port || 3000;
const MONGODB_URI  = process.env.MONGODB_URI || 'mongodb://localhost/fruitdev';

//connect to mongo database
mongoose.Promise = Promise; //now every file that requires in mongoose has this becuase it is cached
mongoose.connect(MONGODB_URI);

const app = express();
app.use(morgan('dev'));
app.use(cors()); //can pass in arguments but now says anybody can use this api
//need cors to have ppl use this from a browser

//routes
app.use(fruitRouter);
app.use(locationRouter);
app.use(errorMiddleware);

const server = module.exports = app.listen(PORT, function() {
  debug('server up');
});

server.isRunning = true;
//start and stop server at every test file
