var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var product_contract = require('../contract/product/contract.js');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
var smartContract = new web3.eth.Contract(product_contract.abi, product_contract.address);

router.get('/', function (req, res, next) {
      console.log(req.session.account);
    res.render('buy', { title: "buy" });
});

router.post('/', function (req, res, next) {
    
    smartContract.methods.buyProduct(req.body.owner, req.session.account).send({
        from: req.session.account,
        value: web3.utils.toWei(req.body.money, 'ether'),
        gas: 2000000
    }).then(function (receipt) {
        
        res.redirect('/items');
    });
})


module.exports = router;
