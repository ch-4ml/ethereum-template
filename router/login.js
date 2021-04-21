var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var product_contract = require('../contract/product/contract.js');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
var smartContract = new web3.eth.Contract(product_contract.abi, product_contract.address);



// func1.then(function(res){
//     console.log(res);
// })

router.get('/', function (req, res, next) {
    res.render('login', { title: "login" });
});

router.post('/', function (req, res) {
    
        web3.eth.getAccounts().then(function (accounts) {
        var i;
        for (i = 0; i < accounts.length; i++) {
            if (req.body.eth_account == accounts[i]) {
                req.session.account = req.body.eth_account;
                res.render('loginProcess', { title: "login....", eth_account: req.body.eth_account });
               
            }
        }
        try{
            if (i == accounts.length) {
            res.redirect('/login');
        }
        }catch(e){
            console.log(e)
        }



    })




});

module.exports = router;