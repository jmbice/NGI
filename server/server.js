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
// app.use((req, res, next) => {
//   console.log(req.method, req.body);
//   next();
// });

// build API calls here
app.get('/content', (req, res) => {
  // gets all content  (20 max)
  request('https://ign-apis.herokuapp.com/content?count=20', (error, response, body) => {
    if (error) {
      res.status(response.statusCode).send();
    } else {
      // if successful, get Ids
      let newsIds = '';
      const data = JSON.parse(body).data.map((ele, ind) => {
        newsIds += ind !== 0 ? ',' : '';
        newsIds += ele.contentId;
        return ele;
      });

      // use Ids to request comment counts
      request(`https://ign-apis.herokuapp.com/comments?ids=${newsIds}`, (e, r, b) => {
        if (e) {
          res.status(r.statusCode).send();
        } else {
          // join comment counts to data
          res.status(r.statusCode).send(JSON.stringify({ data, comments: JSON.parse(b).content }));
        }
      });
    }
  });
});

// listening...
app.listen(port, () => console.log(`IGN-webApp-FE listening on port ${port}!`));
