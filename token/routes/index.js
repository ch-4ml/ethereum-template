const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3('http://localhost:7545');
const contract = require('../contract/myToken.js')
const sc = new web3.eth.Contract(contract.abi, contract.address)

router.get('/', async function(req, res, next) {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log(message, blockNumber);

    const data = {
      title: 'Create new tokens',
      accounts,  // accounts: accounts
    };

    res.render('index', data);  
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
});

router.get('/token/:address', async function(req, res) {
  const address = req.params.address;
  try {
    const balance = await sc.methods.balanceOf().call(address);
    res.status(200).send({ balance });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.put('/token/:address', async function(req, res) {
  const address = req.params.address;
  const value = req.body.value;

  try {
    const result = await sc.methods.mint(address, value).send({ from: address });
    const message = await sc.methods.message().send();
    const blockNumber = await web3.eth.getBlockNumber();
    console.log(result);

    res.status(200).send({ message, blockNumber });
  } catch(err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post('/token', async function(req, res) {
  const { from, to, value } = req.body;  // destructuring assignment
  try {
    const result = await sc.methods.transfer(to, value).send({ from });
    console.log(result);

    res.status(200).send({ msg: '토큰을 성공적으로 전송했습니다.'});
  } catch(err) {
    console.error(err);
    res.status(200).send({ msg: '토큰 전송에 실패했습니다.'});
  }
});

module.exports = router;
