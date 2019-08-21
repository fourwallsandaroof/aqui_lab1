var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

var price;

fetch('https://api.estadisticasbcra.com/usd_of_minorista',{
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTc3NzYzMDksInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJhcXVpbGVzXzEwMDlAaG90bWFpbC5jb20ifQ.Lu_lK0MAobv_RNcUryxKH9jC1wqkg7TXQ4E6UVWNz5gQ5jU9f3oFYSdW9C7sSe552dQWCSSN0ctJUJDMzXL_qA' }
    })
    .then(res => res.json())
    .then(json => {
      price = json[json.length - 1].v
      return console.log(price);
    });



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', price: price });
});

module.exports = router;
