const express = require('express');
const path = require('path');
const request = require('request');

const port = process.env.PORT || 3000;
const redirect = process.env.PORT ? 'http://jordanbice-news.herokuapp.com/' : 'http://localhost:3000';
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

app.get('/content/:count', (req, res) => {
  // gets content based on count (count min = 1, max = 20)
  request(`https://ign-apis.herokuapp.com/content?startIndex=0&count=${req.params.count}`, (error, response, body) => {
    if (error) {
      if (response) {
        res.status(response.statusCode).send();
      } else { console.log('error getting content'); }
    } else {
      res.status(response.statusCode).send(body);
    }
  });
});

app.get('/comments/:ids', (req, res) => {
  //  get comment counts from ids
  request(`https://ign-apis.herokuapp.com/comments?ids=${req.params.ids}`, (error, response, body) => {
    if (error) {
      res.status(response.statusCode).send();
    } else {
      res.status(response.statusCode).send(body);
    }
  });
});

app.get('/content/:startIndex/:count', (req, res) => {
  // get content from startIndex based on count (count min = 1, max = 20)
  request(`https://ign-apis.herokuapp.com/content?startIndex=${req.params.startIndex}&count=${req.params.count}`, (error, response, body) => {
    if (error) {
      if (response) {
        res.status(response.statusCode).send();
      } else { console.log('error getting earlier content'); }
    } else {
      res.status(response.statusCode).send(body);
    }
  });
});

app.get('/*', (req, res) => {
  res.redirect(redirect);
});

// listening...
app.listen(port, () => console.log(`NGI-webApp-FE listening on port ${port}!`));
