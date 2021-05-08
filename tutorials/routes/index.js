const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545');
const contract = require('../contract/helloWorld.js')
const sc = new web3.eth.Contract(contract.abi, contract.address)

router.get('/', async function(req, res, next) {
  try {
    // 현재 네트워크에 존재하는 지갑을 가져옴
    const accounts = await web3.eth.getAccounts();
    // Contract에서 message라는 이름을 가진 변수의 값을 호출
    const message = await sc.methods.message().call();

    console.log(message);

    const data = {
      title: 'My first ethereum application',
      accounts,  // accounts: accounts
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
