const express = require('express');
const path = require('path');
const axios = require('axios');
const port = 3000;
const app = express();
//change to local host if desired for environment 'http://localhost:3001' 'http://localhost:3002'
const sizeColorServicePath = 'http://3.18.69.132:3001';
const productServicePath = 'http://localhost:3002';
const galleryServicePath = 'http://54.241.116.3:3004';
const feedbackServicePath = 'http://3.18.69.132:3003';

require('newrelic');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/products/:productId/summary', (req, res) => {
  let id = req.params.productId;

  axios({
    method: 'get',
    url: `${productServicePath}/products/${id}/summary`
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.error(err);
    res.send([]);
  });

});

app.get('/products/:productId/gallery', (req, res) => {
  let id = req.params.productId;

  axios({
    method: 'get',
    url: `${galleryServicePath}/products/${id}/gallery`
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.error(err);
    res.send([]);
  });

});

app.get('/shoes/:shoeID/colors', (req, res) => {
  let shoeID = req.params.shoeID;
  axios.get(`${sizeColorServicePath}/shoes/${shoeID}/colors`)
  .then((colors) => {
    res.send(colors.data);
  })
    .catch(err => {
      console.error(err);
    });
})

app.get('/shoes/:shoeID/sizes', (req, res) => {
  let shoeID = req.params.shoeID;

  axios.get(`${sizeColorServicePath}/shoes/${shoeID}/sizes`)
    .then(sizes => {
      res.send(sizes.data);
    })
    .catch(err => {
      console.error(err);
    });
});

app.get('/shoes/:shoeID/colors/:colorID/quantities', (req, res) => {
  let {shoeID, colorID} = req.params;

  axios.get(`${sizeColorServicePath}/shoes/${shoeID}/colors/${colorID}/quantities`)
    .then(quantities => {
      res.send(quantities.data);
    })
    .catch(err => {
      console.log('this broke: shoeid and colorid');
    });
});

app.get('/shoes/:shoeId/reviews/:count', (req, res) => {
  let {shoeId, count} = req.params;
  axios.get(`${feedbackServicePath}/shoes/${shoeId}/reviews/${count}`)
  .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.error(err);
    });
});

app.get('/shoes/:shoeId/rating', (req, res) => {
  let {shoeId} = req.params;
  axios.get(`${feedbackServicePath}/shoes/${shoeId}/rating`)
  .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.error(err);
    });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});