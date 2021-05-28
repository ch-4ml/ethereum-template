const express = require('express');
const router = express.Router();

const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545');
const contract = require('../contract/helloWorld.js')
const sc = new web3.eth.Contract(contract.abi, contract.address)

router.get('/', async function(req, res, next) {
  try {
    // 현재 네트워크에 존재하는 모든 지갑 리스트를 가져옴
    const accounts = await web3.eth.getAccounts();
    // Contract에서 message라는 이름을 가진 변수의 현재 값을 호출
    const message = await sc.methods.message().call();
    // 현재 네트워크의 블록 넘버를 호출
    const blockNumber = await web3.eth.getBlockNumber();

    console.log(message, blockNumber);

    const data = {
      title: 'Hello World',
      accounts,  // accounts: accounts
      message,
      blockNumber
    };

    res.render('hello-world', data);
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
});

router.put('/message', async function(req, res) {
  const sender = req.body.sender;
  const newMessage = req.body.newMessage;
  try {
    // 
    const result = await sc.methods.update(newMessage).send({ from: sender });
    const message = await sc.methods.message().call();
    const blockNumber = await web3.eth.getBlockNumber();
    console.log(result);

    res.status(200).send({ message, blockNumber });
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
