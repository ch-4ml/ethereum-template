var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var product_contract=require('../contract/product/contract.js');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('logout', { title: 'logout'});
  // console.log(req.user.userId);
});


module.exports = router;
