const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const contract = new web3.eth.Contract(product_contract.abi, product_contract.address);



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My first ethereum application' });
});

router.post('/message', function(req, res, next) {

});

module.exports = router;
