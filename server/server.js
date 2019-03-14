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
app.get('/content', (req, res) => {
  request('https://ign-apis.herokuapp.com/content?count=20', (error, response, body) => {
    if (error) {
      res.status(response.statusCode).send();
    } else {
      res.status(response.statusCode).send(body);
    }
  });
});

// listening...
app.listen(port, () => console.log(`IGN-webApp-FE listening on port ${port}!`));
