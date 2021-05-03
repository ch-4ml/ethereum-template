const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545');
const contract = require('../contract/helloWorld.js')
const sc = new web3.eth.Contract(contract.abi, contract.address)

router.get('/', async function(req, res, next) {
  try {
    const accounts = await web3.eth.getAccounts();
    const message = await sc.methods;

    console.log(message);

    const data = {
      title: 'My first ethereum application',
      accounts,
      message
    };

    res.render('index', data);  
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post('/message', function(req, res) {
  const msg = req.body.msg;
  console.log(msg);
});

module.exports = router;
