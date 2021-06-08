const express = require("express");
const router = express.Router();

const Web3 = require("web3");
const web3 = new Web3("http://localhost:7545");
const contract = require("../contract/myToken.js")
const sc = new web3.eth.Contract(contract.abi, contract.address)

// Go to "My Token" page
router.get("/", async function(req, res, next) {
  try {
    const accounts = await web3.eth.getAccounts();
    const blockNumber = await web3.eth.getBlockNumber();

    const data = {
      title: "My token example",
      accounts,   // accounts: accounts
      blockNumber // blockNumber: blockNumber
    };

    res.render("my-token", data);  
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
});

// Get token balance for address
router.get("/:address", async function(req, res) {
  const address = req.params.address;
  try {
    const balance = await sc.methods.balanceOf(address).call();
    res.status(200).send({ balance });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// Mint new tokens for address
router.put("/:address", async function(req, res) {
  const address = req.params.address;
  const amount = req.body.amount;

  try {
    const result = await sc.methods.mint(address, amount).send({ from: address });
    const blockNumber = await web3.eth.getBlockNumber();
    console.log(result);

    res.status(200).send({ blockNumber, msg: "토큰을 생성했습니다." });
  } catch(err) {
    console.error(err);
    res.status(200).send({ msg: "토큰 생성에 실패했습니다." });
  }
});

router.post("/", async function(req, res) {
  const { from, to, amount } = req.body;  // destructuring assignment

  try {
    const result = await sc.methods.transfer(to, amount).send({ from });
    const blockNumber = await web3.eth.getBlockNumber();
    console.log(result);
    res.status(200).send({ blockNumber, msg: "토큰을 전송했습니다."});
  } catch(err) {
    console.error(err);
    res.status(200).send({ msg: "토큰 전송에 실패했습니다."});
  }
});

module.exports = router;