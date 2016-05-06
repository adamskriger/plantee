/* STRICT MODE: Allows for some ES6 functionality, doesnt allow use of undeclared constiables */
'use strict';
/* DOTENV: Simple module to store and hide confidential information */
require('dotenv').config();
/* EXPRESS: Web app framework */
const express = require('express');
/* MORGAN: HTTP request logger tied to express */
const logger = require('morgan');
/* PATH: Extracted nodeJS 'path' module for NPM */
const path = require('path');
/* BODYPARSER: Middleware to parse request body for back-end */
const bodyParser = require('body-parser');
/* BCRYPT: Module for password hashing methods */
const bcrypt = require('bcrypt');
/* SALT: First layer of password hashing - number of hash iterations */
const salt = bcrypt.genSaltSync(10);
/* HASH: Calls from bcrypt, salt to initiate password hash */
const hash = bcrypt.hashSync('B4c0/\/', salt);
/* TWILIO: Relative path to our twilio API methods */
const twil = require('./public/js/twil.js');
/* USERROUTES: Relative path to our UserAuth Route */
const usersRoutes = require('./routes/users');
/* PLANTEEROUTES: Relative path to our DB integrated route */
const planteeRoutes = require('./routes/plantee');
/* PG: Used for CronJob */
const pg = require('pg');
const cs = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost/project3`;
const jsdom = require("jsdom");
const $ = require('jquery');


/* TWILIO API AUTHENTICATION */
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
/* CLIENT: Require the Twilio module and create a REST client */
const client = require('twilio')(accountSid, authToken);




/* EXPRESS APP INITIALIZATION */
const app = express();

/* MODULE CONFIGURATION BOUND TO EXPRESS APP */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')))
app.use(logger('dev'));
app.use('/users', usersRoutes);
app.use('/plantee', planteeRoutes);

/* HOME ROUTE */
  app.get('/', (req, res)=>{
    res.sendFile('index.html')
  })

  /* MOBILE ROUTE */
  app.get('mobile', (req, res)=>{
    res.sendFile('mobile.html')
  })







// app.get('*', (req, res)=>{
//   res.render('index.html')
// });

/* SERVER INITIALIZATION */
app.listen(3000 , ()=> console.log(`Server initialized on // ${new Date()}`));
