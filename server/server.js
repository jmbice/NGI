const express = require('express');
const path = require('path');
const request = require('request');

const port = 3000;
const app = express();

// paths, parseJSON = true, pars URL encoded = true, allow x-origin requests
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// build middleware here


// build API calls here


// listening...
app.listen(port, () => console.log(`IGN-webApp-FE listening on port ${port}!`));
